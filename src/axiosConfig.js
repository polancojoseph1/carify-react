import axios, * as others from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
});

const auth = axios.create({
  baseURL: 'http://localhost:8080/auth/',
});

export {
  api,
  auth
};