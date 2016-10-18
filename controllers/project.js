const Sequelize = require('sequelize');
const User = require('../models/user');
const Project = require('../models/project');
const Comment = require('../models/comment');

var fn_index = async (ctx, next) => {
    const id = ctx.params.id;
    const project = await Project.findAll({
        where: {
            id: id
        },
        include: [{
            model: User,
            where: { id: Sequelize.col('projects.userId') }
        }]
    });

    const comments = await Comment.findAll({
        where: {
            projectId: id
        },
        include: [{
            model: User,
            where: { id: Sequelize.col('comments.userId') }
        }]
    });

    const resProject = project[0].dataValues;
    const user = resProject.user.dataValues;
    const resComments = comments.map(item => {
        const comment = item.dataValues;
        const commentUser = comment.user.dataValues;
        const object = {
            user: {
                id: commentUser.id,
                name: commentUser.name,
                avatar: commentUser.avatar
            },
            content: comment.content,
            time: comment.time
        };
        return object;
    });
    
    const data = {
        user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar
        },
        project: {
            id: resProject.id,
            time: resProject.time,
            title: resProject.title,
            desc: resProject.desc,
            image: resProject.image
        },
        comments: resComments
    };
    ctx.response.header['Content-Type'] = 'application/json';
    ctx.response.body = JSON.stringify(data);
};

module.exports = {
    'GET /api/project/:id': fn_index
};