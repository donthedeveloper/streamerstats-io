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
        debug: false
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "StreamerStatsBot",
        password: process.env.OAUTH
    },
    // channels: ["#hardlydifficult"]
    channels: ["#reynad27"]
};
const client = new tmi.client(options);
client.connect();

// NOT AVAILABLE IN LARGER CHANNELS
// TODO: FIND OUT WHAT DEFINES 'LARGER'
client.on("join", function (channel, username, self) {
    // console.log('channel:', channel);
    // console.log('username', username);
    // console.log('self', self);
    // console.log('\n\n');
});
// Given in batches of 30 seconds each

client.on("part", function (channel, username, self) {
    // console.log('channel:', channel);
    // console.log('username', username);
    // console.log('self', self);
    // console.log('\n\n');
});

// TODO: NOT SEEING ANY BANS
client.on("ban", function (channel, username, reason) {
    // Do your stuff.
    console.log('channel:', channel);
    console.log('username', username);
    console.log('reason:', reason);
    console.log('\n\n');
});

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    // Do your stuff.
    console.log(userstate);
});

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