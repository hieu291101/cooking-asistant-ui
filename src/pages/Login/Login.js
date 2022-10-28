import classNames from 'classnames/bind';
import Button from '~/components/Button';
import LoginForm from '~/layouts/components/LoginForm';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-top')}>
                <h2>Sign In</h2>
                <LoginForm />
            </div>
            <div className={cx('login-bottom')}>
                <Button primary>Continue with Facebook</Button>
                <Button primary>Continue with Google</Button>
            </div>
        </div>
    );
}

export default Login;
