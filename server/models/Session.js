/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const axios = require('axios');

class Session {
  constructor(clientID, clientSecret) {
    this.id = null;
    this.access_token = null;
    this.url = 'https://uat-api.synapsefi.com/v3.1';
    this.headers = {
      'Content-Type': 'application/json',
      'X-SP-GATEWAY': `${clientID}|${clientSecret}`,
      'X-SP-USER-IP': '127.0.0.1',
      'X-SP-USER': '|static_pin',
    };
    this.body = {
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
  }

  /**
   * Gets OAuth keys using provided headers
   * @param {Object} headers - Request headers for Synapse API
   * @returns {Promise} - Returns the promise of a request to the API with the refresh token
   */
  getOAuth() {
    const { headers, body, url } = this;

    return axios.post(`${url}/users`, body, { headers })
      .then(({ data }) => {
        const { refresh_token } = data;
        this.id = data._id;

        // OAuth User
        return axios.post(`${url}/oauth/${this.id}`, { refresh_token }, { headers });
      })
      .then(({ data }) => {
        const { oauth_key } = data;

        // Update OAuth token
        this.headers = { ...headers, 'X-SP-USER': `${oauth_key}|static_pin` };
      });
  }

  /**
   * Logins to the user's bank account using username and password
   * @param {String} username - Username for bank account
   * @param {String} password - Password for bank accout
   * @returns {Promise} - Returns the promise of a login request to the API
   */
  login(username, password) {
    const { headers, url, id } = this;
    const info = {
      bank_name: 'fake',
      bank_id: username,
      bank_pw: password,
    };

    // Login to bank account
    return axios.post(`${url}/users/${id}/nodes`, { type: 'ACH-US', info }, { headers });
  }

  authenticate(answer) {
    const {
      url,
      access_token,
      id,
      headers,
    } = this;

    return axios.post(`${url}/users/${id}/nodes`, { access_token, mfa_answer: answer }, { headers });
  }
}

module.exports = Session;

/* eslint-enable */
