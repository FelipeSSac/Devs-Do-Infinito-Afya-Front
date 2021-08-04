import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://60afee7a1f26610017ffd908.mockapi.io/api/'
})

export const apiAddress = axios.create({
  baseURL: 'https://viacep.com.br/ws'
})