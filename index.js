const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const AUTH = require('./config');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000)

// const cookieParser = require('cookie-parser');
// const cors = require('cors');
const app = express();
const dev = app.get('env') !== 'production'

if(!dev) {
  app.disable('x-powered-by')
  app.use(compression())
  app.use(morgan('common'))

  app.use(express.static(path.resolve(__dirname, 'build')))

  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'build', 'index.html'))
  })
}

if(dev) {
  app.use(morgan('dev'))
}

const server = createServer(app)

server.listen(PORT, err => {
  if (err) throw err

  console.log("Server Started")
})

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


app.post('/api/form', (req, res) => {
  
  const auth = {
    auth: {
      api_key: AUTH.APIKEY,
      domain: AUTH.DOMAIN
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth))

  const htmlEmail = `
    <h3>Ryan Gelow Portfolio Outreach Email</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `

  nodemailerMailgun.sendMail({
    from: 'outreach@ryangelow.com',
    to: AUTH.USER, // An array if you have multiple recipients.
    // cc:'second@domain.com',
    // bcc:'secretagent@company.gov',
    subject: 'Ryan Gelow Portfolio Outreach',
    html: htmlEmail,
    text: req.body.message,
  }, (err, info) => {
    if (err) {
      console.log(`Error: ${err}`);
    }
    else {
      console.log(`Response: ${JSON.stringify(info)}`);
    }
  });
  
})