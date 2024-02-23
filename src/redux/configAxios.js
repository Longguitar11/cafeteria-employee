import axios from 'axios';
const Axios = axios.create({
	// Configuration
	baseURL: 'http://localhost:5000',
	timeout: 8000,
	headers: {
		Accept: 'application/json',
	},
});

export default Axios

