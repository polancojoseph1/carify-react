import axios from 'axios'

const api = axios.create({
  baseURL: 'https://carify-liard.vercel.app/api/',
});

const auth = axios.create({
  baseURL: 'https://carify-liard.vercel.app/auth/',
});

export {
  api,
  auth
};