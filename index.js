const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./src/api');
const urlConfig = require('./config/urlConfig');

const app = express();

// making this for handling different base url's.
const PORT = urlConfig.httpPort[process.env.NODE_ENV] || 5001;
const baseApiUrl = urlConfig.baseApiUrl[process.env.NODE_ENV] || '/api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting static folder
app.use('/', express.static(path.join(__dirname, '/static')));

// setting all our routers from main api file
app.use(baseApiUrl, router);

app.use('*', (req, res) => {
  res.status(404).send('Not found');
});

try {
  app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
  app.close();
}
