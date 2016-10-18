const User = require('../models/user');

var fn_index = async (ctx, next) => {
    const userId = ctx.params.id;
    const user = await User.findAll({
        where: {
            id: userId
        }
    });
    ctx.response.header['Content-Type'] = 'application/json';
    ctx.response.body = JSON.stringify(user[0].dataValues);
};

module.exports = {
    'GET /api/user/:id': fn_index
};