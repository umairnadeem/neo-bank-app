const axios = require('axios');

const url = 'https://uat-api.synapsefi.com/v3.1';

const { clientID, clientSecret } = require('./config');

const headers = {
  'Content-Type': 'application/json',
  'X-SP-GATEWAY': `${clientID}|${clientSecret}`,
  'X-SP-USER-IP': '127.0.0.1',
  'X-SP-USER': '|static_pin',
};

module.exports = {
  createUser: (req, res) => {
    let payload; // Storage for user ID and token

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

    axios.post(`${url}/users`, body, { headers })
      .then(({ data }) => {
        const { _id, refresh_token } = data;
        payload = { _id, refresh_token };
      })
      .catch(err => res.status(400).send(err));
  },
};
