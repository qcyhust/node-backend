const db = require('../db');
const User = require('./user');

let Comment = db.defineModel('comments', {
    userId: db.INTEGER(50),
    projectId: db.INTEGER(50),
    content: db.STRING(1000),
    time: db.STRING(100)
});

Comment.belongsTo(User, {
    onDelete: "CASCADE",
    foreignKey: {
        allowNull: false
    }
});

module.exports = Comment;