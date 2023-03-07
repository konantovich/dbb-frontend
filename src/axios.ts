import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://dbbnestjs.herokuapp.com',
});

export default instance;
