import axios from 'axios';

const blingApi = axios.create({
  baseURL: 'https://bling.com.br/Api/v2',
});

export default blingApi;
