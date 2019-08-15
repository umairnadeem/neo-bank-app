const router = require('express').Router();

const controllers = require('./controllers');

router.get('/test', controllers.test);

router.post('/users/create', controllers.createUser);

router.post('/users/authenticate', controllers.authenticateUser);

module.exports = router;
