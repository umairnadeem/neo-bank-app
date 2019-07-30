const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));

// app.get('/api/:query/sentiment', (req, res) => {
//   getSentiment(req.params.query)
//     .then(data => res.send(data));
// });

app.listen(PORT, () => console.log(`Listening on ${PORT}`));