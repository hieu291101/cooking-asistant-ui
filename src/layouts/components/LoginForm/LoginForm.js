import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import config from '~/config';

import styles from './LoginForm.module.scss';
import AuthService from '~/services/auth.service';

const cx = classNames.bind(styles);

function LoginForm() {
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Email/ Username is required'),
        password: Yup.string()
            .required('Password is required')
            // .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        AuthService.login(username, password).then(
            () => {
                navigate('/');
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            },
        );
    };

    return (
        <Form
            className={cx('container')}
            onSubmit={(e) => {
                handleSubmit(handleLogin(e));
            }}
        >
            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicEmail">
                <Form.Label>Email/ Username</Form.Label>
                <Form.Control
                    type="text"
                    {...register('username')}
                    className={`${errors.username ? 'is-invalid' : ''}`}
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    {...register('password')}
                    className={`${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={cx('form-group', 'mb-3', 'form-group-option')} controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
                <Link to={config.routes.register} className={cx('sign-up-link')}>
                    Trouble singing in?
                </Link>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Sign in</span>
            </Button>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

export default LoginForm;
