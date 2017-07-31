const chalk = require('chalk');
require('dotenv').config();
const {db, User, Feature, Point} = require('./index');

const emails = [
    { email: 'don@donthedeveloper.tv' }, 
    { email: 'fakedon@donthedeveloper.tv' }
];

const features = [
    { content: 'statistics' },
    { content: 'twitch bot' }
];

const points = [
    { 
        username: 'donthedeveloper', 
        joined: Date.now(), 
        parted: Date.now()
    }
];

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
    return Point.bulkCreate(points, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded points table.'));
    return;
})
.catch((err) => {
    console.log(chalk.red('Uh oh, something happened', err.message));
});