const router = require('express').Router();

const controllers = require('./controllers');

router.get('/dasboard/:node/trans', controllers.getTrans);

router.get('/users/verify', controllers.verifyUser);

router.post('/users/create', controllers.createUser);

router.post('/users/authenticate', controllers.authenticateUser);

module.exports = router;
