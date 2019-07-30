const router = require('express').Router;

const axios = require('axios');

const URL = 'https://uat-api.synapsefi.com/v3.1';

const controllers = require('./controllers.js');

router.get('/user/create', controllers.createUser);
