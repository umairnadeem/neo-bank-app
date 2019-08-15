const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./routes');
const middleware = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use('/api/v1', middleware.verifyCookies);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/api/v1', router);

app.listen(PORT, () => console.info(`Listening on ${PORT}`)); // eslint-disable-line no-console
