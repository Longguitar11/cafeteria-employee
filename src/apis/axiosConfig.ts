import { getItemLS } from '@/utils/localStorage';
import axios from 'axios';

const token = getItemLS('userToken');

const Axios = axios.create({
  // Configuration
  baseURL: 'http://localhost:8081',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export default Axios;
