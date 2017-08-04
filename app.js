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
    channels: ["#starlightskyes"]
};
const client = new tmi.client(options);
// ===


// GET VIEWERS ON BOT LOAD AND SUBMIT TO LOCAL DATABASE
function getViewers(streamerName) {
    axios.get(`http://tmi.twitch.tv/group/user/${streamerName}/chatters`)
        .then((chatters) => {
            const viewers = chatters.data.chatters.viewers;

            console.log(chalk.yellow(viewers.length));

            const currentDateTime = Date.now();

            viewers.forEach((viewer) => {
                const viewerPostObj = {
                    username: viewer, 
                    joined: currentDateTime
                };

                submitViewer(viewerPostObj);
            })
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

function updateViewer(viewerObj) {
    axios.put(`http://localhost:3000/api/points/${viewerObj.username}`, viewerObj)
        .then((res) => {
            // console.log(res);
        })
        .catch((err) => {
            console.error(err.message);
        })
}

getViewers('starlightskyes');
// ===

client.connect();

client.on("part", function (channel, username, self) {
    const viewerObj = {
        username: username, 
        parted: Date.now()
    }

    console.log('Parted:', chalk.blue(username));
    updateViewer(viewerObj);
    
});

client.on("join", function (channel, username, self) {
    const viewerObj = {
        username: username, 
        joined: Date.now()
    }

    console.log(chalk.yellow(username));

    submitViewer(viewerObj);
});



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