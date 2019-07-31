const router = require('express').Router();

const controllers = require('./controllers.js');

router.get('/users/create', controllers.createUser);

module.exports = router;
