// MODULES
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios');

const testUsername = 'donthedeveloper';

// IRC
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
    channels: [`#${testUsername}`]
};
const client = new tmi.client(options);
// ===



function addLog(eventName) {
    console.log(eventName);
    const logObj = {
        eventName
    };

    axios.post('http://localhost:3000/api/logs', logObj)
        .then((res) => {
            if (res.status === 200) {
                const addedEventName = res.data.addedEventName;
                const updatedAt = res.data.updatedAt;

                // console.log(
                //     'Added event ' + 
                //     chalk.green(addedEventName) + 
                //     ' to the logs at ' + 
                //     chalk.blue(updatedAt) + 
                //     '.'
                // );
            }
        })
}

function submitViewer(viewerObj) {
    const username = viewerObj.username;
    const parted = viewerObj.joined;

    axios.post('http://localhost:3000/api/channeltime', viewerObj)
        .then((res) => {
            const updatedJoined = res.data.updatedJoined;

            if (res.status === 200) {
                console.log(
                    chalk.magenta(username) + 
                    chalk.green(' joined ') + 
                    'the channel at ' + 
                    chalk.green(updatedJoined) + 
                    '.'
                );

                addLog('joined');
            }
        })
        .catch((err) => {
            // console.error(chalk.red(err.message));
        })
}

function updateViewer(viewerObj) {
    const username = viewerObj.username;

    axios.put(`http://localhost:3000/api/channeltime/${username}`, viewerObj)
        .then((res) => {
            const updatedParted = res.data.updatedParted;

            if (res.status === 200) {
                console.log(
                    chalk.magenta(username) + 
                    chalk.yellow(' parted ') + 
                    'the channel at ' + 
                    chalk.yellow(updatedParted) + 
                    '.'
                );

                addLog('parted');
            }
        })
        .catch((err) => {
            // console.error(chalk.red(err.message));
        })
}

function sayInChat(message) {
    client.say("donthedeveloper", message);
}

function getViewerPoints(username) {
    axios.get(`http://localhost:3000/api/points/${username}`)
        .then((res) => {
            const points = res.data.points;
            const message = `${username} has ${points} point(s).`;
            sayInChat(message);
        })
        .catch((err) => {
            // console.error(chalk.red(err.message));
        });
}

function updateViewerPoints(pointsObj) {
    const username = pointsObj.username;
    const initialPoints = pointsObj.points;

    axios.put(`http://localhost:3000/api/points/${username}`, pointsObj)
        .then((res) => {
            const prevPoints = res.data.prevPoints;
            const updatedPoints = res.data.updatedPoints;

            // ALREADY EXISTING USER WAS UPDATED WITH POINTS
            if (res.status === 200) {
                console.log('Points ' + 
                    chalk.green('incremented ') + 
                    'for ' + 
                    chalk.magenta(username) + 
                    '. Was: ' + 
                    chalk.yellow(prevPoints) + 
                    '. Now is: ' + 
                    chalk.green(updatedPoints) + 
                    '.'
                );
            // NEW USER WAS CREATED WITH INITIAL POINTS
            } else if (res.status === 201) {
                console.log(
                    chalk.magenta(username) + 
                    ' was created, starting with ' + 
                    chalk.green(updatedPoints) + 
                    ' point.'
                );
            }

            addLog('incrementedPoints');
        })
        .catch((err) => {
            console.error(err);
        })
}

function getViewers(streamerName) {
    // const getViewers = getViewers(streamerName);
    let viewers;
    const numOfPoints = 1;

    axios.get(`http://tmi.twitch.tv/group/user/${streamerName.toLowerCase()}/chatters`)
        .then((chatters) => {
            viewers = chatters.data.chatters.viewers;

            // update viewer points
            if (viewers) {
                viewers.forEach((viewer) => {
                    const pointsObj = {
                        username: viewer, 
                        points: numOfPoints, 
                        incrementer: 1
                    };

                    updateViewerPoints(pointsObj);
                })
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
}

getViewers(testUsername);

setInterval(() => {
    getViewers(testUsername);
}, 90000)
// ===

client.connect();

client.on("part", function (channel, username, self) {
    // Don't listen to my own messages..
    if (self) return;

    const viewerObj = {
        username: username, 
        parted: Date.now()
    }

    // console.log('Parted:', chalk.blue(username));
    updateViewer(viewerObj);
    
});

client.on("join", function (channel, username, self) {
    // Don't listen to my own messages..
    if (self) return;

    const viewerObj = {
        username: username, 
        joined: Date.now()
    }

    submitViewer(viewerObj);
});

// triggered when we join a channel
client.on("roomstate", function (channel, state) {
    // Do your stuff.
    console.dir(channel);
});

client.on("message", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    // Handle different message types..
    switch(userstate["message-type"]) {
        case "action":
            // This is an action message..
            break;
        case "chat":
            // This is a chat message..
            console.log(message);
            if (message === '!points') {
                const username = userstate.username;
                // const replyMessage = 'I gives you all ze points!';
                // client.say("donthedeveloper", replyMessage);
                getViewerPoints(username);
                // console.log(userstate);
            }
            break;
        case "whisper":
            // This is a whisper..
            break;
        default:
            // Something else ?
            break;
    }
});



// MIDDLEWARE
// app.use(morgan('dev'));
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