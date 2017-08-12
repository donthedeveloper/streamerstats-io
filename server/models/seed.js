const chalk = require('chalk');
require('dotenv').config();
const {db, User, Feature, ChannelTime, Point} = require('./index');

const emails = [
    { email: 'don@donthedeveloper.tv' }, 
    { email: 'fakedon@donthedeveloper.tv' }
];

const features = [
    { content: 'statistics' },
    { content: 'twitch bot' }
];

const channeltime = [
    { 
        username: 'donthedeveloper', 
        joined: Date.now(), 
        parted: Date.now()
    }
];

const points = [
    {
        username: 'donthedeveloper', 
        points: 1
    }
]

db.sync({ force: true })
.then(() => {
    console.log(chalk.blue('Dropped old data.'));

    // CREATE EMAILS
    return User.bulkCreate(emails, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded email table.'));

    // CREATE FEATURE REQUESTS
    return Feature.bulkCreate(features, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded features table.'));
    return ChannelTime.bulkCreate(channeltime, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded channeltime table.'));
    return Point.bulkCreate(points, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded points table.'));
})
.catch((err) => {
    console.log(chalk.red(err));
});