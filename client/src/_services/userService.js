import axios from 'axios';

const login = (username, password) => axios.post('/api/v1/users/create', { username, password })
  .then(res => res);

const authenticate = answer => axios.post('/api/v1/users/authenticate', { answer })
  .then(res => res);

export const userService = {
  login,
  authenticate,
};
