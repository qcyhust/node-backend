const Comment = require('../models/comment');
const User = require('../models/user');

var fn_index = async (ctx, next) => {
    const content = ctx.request.body.comment || '';
    const projectId = ctx.request.body.project_id || '';
    const userId = ctx.request.body.user_id || '';
    const time = ctx.request.body.time || '';
    const comment = await Comment.create({
        content,
        projectId,
        userId,
        time
    });
    const user = await User.findAll({
        where: {
            id: userId
        }
    });
    const resComment = {
        user: {
            id: user[0].dataValues.id,
            name: user[0].dataValues.name,
            avatar: user[0].dataValues.avatar
        },
        content: comment.dataValues.content,
        time: comment.dataValues.time
    };
    
    ctx.response.header['Content-Type'] = 'application/json';
    ctx.response.body = JSON.stringify(resComment);
};

module.exports = {
    'POST /api/comment': fn_index
};