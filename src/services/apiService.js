import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1',
});

export default apiService;

