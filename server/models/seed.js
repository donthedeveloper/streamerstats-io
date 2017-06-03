const chalk = require('chalk');
require('dotenv').config();
const {db, User} = require('./index');

const emails = [
    {
        email: 'don@donthedeveloper.tv'
    }, 
    {
        email: 'fakedon@donthedeveloper.tv'
    }
];

db.sync({ force: true })
.then(() => {
    console.log(chalk.blue('Dropped old data'));

    // CREATE EMAILS
    return User.bulkCreate(emails, { individualHooks: true });
})
.then(() => {
    console.log(chalk.green('Successfully seeded email table'));
    return;
})
.catch((err) => {
    console.log(chalk.red('Uh oh, something happened', err.message));
});