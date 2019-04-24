import axios from 'axios'
import Agent from 'agentkeepalive'

const keepaliveAgent = new Agent({
    maxSockets: 100,
    maxFreeSockets: 10,
    timeout: 60000,
    freeSocketTimeout: 30000
})
const httpClient = axios.create({
    baseURL: 'https://cjd6568358.3322.org:6706/api/',
    withCredentials: true
});
httpClient.defaults.httpAgent = keepaliveAgent;
httpClient.interceptors.request.use(async (config) => {
    // Do something before request is sent
    return config;
}, async function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
httpClient.interceptors.response.use(async (response) => {
    // eslint-disable-next-line
    console.log('request url:' + response.request.responseURL);
    // Do something with response data
    return response.data;
}, async function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default httpClient