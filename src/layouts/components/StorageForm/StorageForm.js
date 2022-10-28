import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import config from '~/config';
import AuthService from '~/services/auth.service';
import styles from './StorageForm.module.scss';
import { useForm } from 'react-hook-form';
import FormControl from '../FormControl';
import PropTypes from 'prop-types';
import StorageService from '~/services/storageService';

const cx = classNames.bind(styles);

function StorageForm({ props, func }) {
    const validationSchema = Yup.object().shape({
        food: Yup.string()
            .required('field is required')
            .min(2, 'At least 2 characters')
            .max(20, 'Not exceed 20 characters'),
        bestbefore: Yup.date().typeError('field is required').min(new Date(), 'must be after current date'),
        measure: Yup.string().required('field is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [food, setFood] = useState('');
    const [bestbefore, setBestBefore] = useState(Intl.DateTimeFormat('sv-SE').format(new Date()));
    const [amount, setAmount] = useState(1);
    const [measure, setMeasure] = useState('');
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const onChangeFood = (e) => {
        const food = e.target.value;
        setFood(food);
    };

    const onChangeBestBefore = (e) => {
        const bestbefore = e.target.value;
        setBestBefore(bestbefore);
    };

    const onChangeAmount = (e) => {
        const amount = e.target.value;
        setAmount(amount);
    };

    const onChangeMeasure = (e) => {
        const measure = e.target.value;
        setMeasure(measure);
    };

    const addValue = (event) => {
        event.preventDefault();
        StorageService.addStorage(currentUser.id, food, measure, amount, bestbefore);
        handleReset();
    };

    const handleReset = () => {
        setFood('');
        setMeasure('');
        setAmount(0);
        setBestBefore(Intl.DateTimeFormat('sv-SE').format(new Date()));
    };

    // const handleRegister = (e) => {
    //     e.preventDefault();

    //     setMessage('');
    //     setSuccessful(false);

    //     AuthService.register(username, email, password).then(
    //         (response) => {
    //             setMessage(response.data.message);
    //             setSuccessful(true);
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response && error.response.data && error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();

    //             setMessage(resMessage);
    //             setSuccessful(false);
    //         },
    //     );
    // };

    return (
        <Form className={cx('container')} onSubmit={(e) => handleSubmit(e)}>
            <FormControl
                label="Food"
                register={register('food')}
                className={`${errors.food ? 'is-invalid' : ''}`}
                placeholder="Enter food"
                value={food}
                onChange={onChangeFood}
                error={errors.food?.message}
            />
            <FormControl
                label="Best before"
                type="date"
                register={register('bestbefore')}
                className={`${errors.bestbefore ? 'is-invalid' : ''}`}
                placeholder="Enter username"
                value={bestbefore}
                onChange={onChangeBestBefore}
                error={errors.bestbefore?.message}
            />

            <Row>
                <Col>
                    <FormControl
                        label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        min="0"
                        onChange={onChangeAmount}
                    />
                </Col>

                <Col>
                    <FormControl
                        label="Measure"
                        register={register('measure')}
                        className={`${errors.measure ? 'is-invalid' : ''}`}
                        placeholder="Enter measure"
                        value={measure}
                        onChange={onChangeMeasure}
                        error={errors.measure?.message}
                    />
                </Col>
            </Row>

            <Button primary type="submit" onClick={(e) => addValue(e)}>
                Add
            </Button>

            {message && (
                <div className="form-group">
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

StorageForm.propTypes = {
    func: PropTypes.func.isRequired,
};

export default StorageForm;
