const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const errorMiddleware = require('./middlewares/error.middleware');
const { PORT } = require('../config');

process.on('unhandledRejection', (reason, r) => {
  console.error(`Unhandled Rejection at: ${r} Reason: ${reason}`);
});

process.on('uncaughtException', (err) => {
  console.error(`Caught exception: \n ${err}`);

  process.exit(1);
});

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(bodyParser.json());

app.use('/api/v1', require('./api/v1'));

app.use((req, res, next) => res.status(404).send({ message: 'Page Not Found', status: 404 }));

app.use(errorMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server: Listening on port ${PORT}`);

  if (process.send) {
    process.send('online');
  }
});
