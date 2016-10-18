const db = require('../db');

let User = db.defineModel('users', {
    name: db.STRING(100),
    number: db.STRING(100),
    avatar: db.STRING(100),
    password: db.STRING(100)
});

module.exports = User;
