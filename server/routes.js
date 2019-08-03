const router = require('express').Router();

const controllers = require('./controllers.js');

router.post('/users/create', controllers.createUser);

module.exports = router;
