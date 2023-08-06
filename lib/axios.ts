import axios from 'axios';

const internalApi = axios.create({
	baseURL: '/api',
});

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export { internalApi, api };
