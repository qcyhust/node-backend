const db = require('../db');
const User = require('./user');

let Project = db.defineModel('projects', {
    userId: db.INTEGER(50),
    time: db.STRING(100),
    title: db.STRING(100),
    desc: db.STRING(100),
    image: db.STRING(100)
});

Project.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
    }
});

module.exports = Project;