import * as httpRequest from '~/utils/httpRequest';

const register = (username, email, password) => {
    return httpRequest.post('auth/signup', {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return httpRequest
        .post('auth/signin', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const sendForgotPasswordEmail = (email) => {
    return httpRequest.post('auth/sendForgotPasswordEmail', {
        email,
    });
};

const refreshToken = (refreshToken) => {
    return httpRequest.post('auth/refreshtoken', {
        refreshToken
    });
} 

const changePassword = (email, param) => {
    return httpRequest.post('auth/savePassword' + param, {
        email,
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    sendForgotPasswordEmail,
    changePassword,
    refreshToken
};

export default AuthService;
