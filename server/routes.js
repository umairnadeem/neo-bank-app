const router = require('express').Router();

const controllers = require('./controllers.js');

router.post('/users/create', controllers.createUser);

router.post('/users/authenticate', controllers.authenticateUser);

module.exports = router;
