const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;
// eslint-disable-next-line no-unused-vars
let db;
if (process.env.env === 'Test') {
  db = mongoose.connect('mongodb://localhost/chartAPI_Test');
} else {
  db = mongoose.connect('mongodb://localhost/chartAPI');
}
const Chart = require('./models/chartModel.js');
const chartRouter = require('./routes/chartRouter')(Chart);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', chartRouter);
app.get('/', (req, res) => {
  res.send('Welcome to Chart API!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port:${port}`);
});

module.exports = app;
