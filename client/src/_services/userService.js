import axios from 'axios';

const login = (username, password) => axios.post('/api/v1/users/create', { username, password })
  .then(res => res)
  .catch(err => err);

const authenticate = answer => axios.post('/api/v1/users/authenticate', { answer })
  .then(res => res)
  .catch(err => err);

export const userService = {
  login,
  authenticate,
};
