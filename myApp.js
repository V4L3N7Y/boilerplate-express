let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/json', (req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  let response;

  console.log(`${method} ${path} - ${ip}`);

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response = 'Hello json'.toUpperCase();
  } else {
    response = 'Hello json';
  }
  
  res.json({ message: response });
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get('/now', middleware, (req, res, next) => {
  res.send({
    time: req.time
  });
});

app.get('/:word/echo', (req, res, next) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get('/name', (req, res, next) => {
  const { first, last } = req.query;
  const fullName = `${first} ${last}`;
  res.json({
    name: fullName
  });
});

app.post('/name', (req, res, next) => {
  const { first, last } = req.body;
  const fullName = `${first} ${last}`;
  res.json({
    name: fullName
  });
});

module.exports = app;


































 module.exports = app;
