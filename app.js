// MODULES
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const chalk = require('chalk');

const tmi = require("tmi.js");
const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "StreamerStatsBot",
        password: process.env.OAUTH
    },
    channels: ["#Gosu"]
};
const client = new tmi.client(options);
client.connect();


// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
const router = require('./server/routes');

app.use('/public', express.static('browser/public'));

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
  console.log( chalk.blue('App is listening on port ' + process.env.PORT || 3000) );
});