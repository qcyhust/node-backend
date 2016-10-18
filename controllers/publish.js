const Project = require('../models/project');

var fn_index = async (ctx, next) => {
    const title = ctx.request.body.title || '';
    const desc = ctx.request.body.desc || '';
    const time = ctx.request.body.time || '';
    const image = ctx.request.body.image || '';
    const userId = ctx.request.body.userId || '';
    const project = await Project.create({
        title,
        desc,
        time,
        image,
        userId
    });
    ctx.response.body = JSON.stringify({msg: 'success'});
};

module.exports = {
    'POST /api/publish': fn_index
};