const axios = require('axios');

class Session {
  constructor(clientID, clientSecret) {
    this.id = null;
    this.accessToken = null;
    this.oAuth = null;
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

    axios.post(`${url}/users`, body, { headers })
      .then(({ data }) => {
        const { refresh_token } = data;
        this.userId = data._id;

        // OAuth User
        return axios.post(`${url}/oauth/${this.id}`, { refresh_token }, { headers });
      })
  }
}

module.exports = Session;
