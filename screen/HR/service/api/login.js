import axios from 'axios';
import request from 'configs/request';

const request = axios.create({
    baseURL: 'http://192.168.12.117:3000/api',
});

export const login = async (data) => {
    try {
        const response = await request.post('login/login', data);
        console.log({ response });
        return response;
    } catch (error) {
        throw error;
    }
};