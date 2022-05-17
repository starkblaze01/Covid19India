import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.mohfw.gov.in/'
});

export default instance;