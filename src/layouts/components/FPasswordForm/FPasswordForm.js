import classNames from 'classnames/bind';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Button from '~/components/Button';
import config from '~/config';
import AuthService from '~/services/auth.service';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './FPasswordForm.module.scss';

const cx = classNames.bind(styles);

function FPasswordForm() {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),

        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        setMessage('');
        setSuccessful(false);
        setLoading(true);
        if (user.email === email) {
            AuthService.sendForgotPasswordEmail(email).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                    setLoading(false);
                },
            );
        } else setMessage('Email is not valid');

        setLoading(false);
    };

    return (
        <Form
            className={cx('container')}
            onSubmit={(e) => {
                handleSubmit();
                handleRegister(e);
            }}
        >
            {!successful && (
                <>
                    <Form.Group className={cx('form-group', 'mb-3')} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register('email')}
                            className={`${errors.email ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Button primary type="submit">
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Submit</span>
                    </Button>
                    <Button primary to={config.routes.login} className={cx('login-link')}>
                        Return login
                    </Button>
                </>
            )}

            {message && (
                <div className="form-group">
                    <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

export default FPasswordForm;
