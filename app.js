// MODULES
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');


// IRC
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
    channels: ["#caineatsabe"]
};
const client = new tmi.client(options);
// ===


// GET VIEWERS ON BOT LOAD AND SUBMIT TO LOCAL DATABASE
function getViewers(streamerName) {
    axios.get(`http://tmi.twitch.tv/group/user/${streamerName}/chatters`)
        .then((chatters) => {
            const viewers = chatters.data.chatters.viewers;

            const currentDateTime = Date.now();

            viewers.forEach((viewer) => {
                const viewerPostObj = {
                    username: viewer, 
                    joined: currentDateTime
                };

                submitViewer(viewerPostObj);
            })

            // console.log(viewers);
        })
        .catch((err) => {
            console.error(err.message);
        });
}

function submitViewer(viewer) {
    axios.post('http://localhost:3000/api/points', viewer)
        .then((res) => {
            // console.log(res);
        })
        .catch((err) => {
            console.error(err.message);
        })
}

getViewers('caineatsabe');
// ===

client.connect();
// TODO:
    // join event
        // submitViewer
    // part event
        // create new post request to updateViewer


// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
const router = require('./server/routes');

app.use('/public', express.static('browser/public'));

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log( chalk.blue(`App is listening on port ${port}`) );
});