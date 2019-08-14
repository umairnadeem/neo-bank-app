const axios = require('axios');

const body = {
  logins: [
    {
      email: 'test@synapsefi.com',
    },
  ],
  phone_numbers: [
    '901.111.1111',
    'test@synapsefi.com',
  ],
  legal_names: [
    'Test User',
  ],
};

const url = 'https://uat-api.synapsefi.com/v3.1';
/**
 * Gets OAuth keys using provided headers
 * @param {Object} headers - Request headers for Synapse API
 * @returns {Promise} - Returns the promise of a request to the API with the refresh token
 */
module.exports.getOAuth = headers => (
  axios.post(`${url}/users`, body, { headers })
    .then(({ data }) => {
      const { refresh_token } = data;
      userId = data._id;

      // OAuth User
      return axios.post(`${url}/oauth/${userId}`, { refresh_token }, { headers });
    })
);
