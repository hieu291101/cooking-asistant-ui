import axios from 'axios';

console.log(process.env);

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;   
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export const dele = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
