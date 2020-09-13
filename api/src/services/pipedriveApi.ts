import axios from 'axios';

const pipedriveApi = axios.create({
  baseURL: 'https://api.pipedrive.com/v1',
});

export default pipedriveApi;
