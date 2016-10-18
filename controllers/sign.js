const IMG_PATH = '/images/avatars/';
const User = require('../models/user');

// 注册
var fn_sign_up = async (ctx, next) => {
    const name = ctx.request.body.name || '';
    const password = ctx.request.body.password || '';
    const number = ctx.request.body.number || '';
    const randomId = parseInt(Math.random() * 12);
    const avatar = `${IMG_PATH}${randomId}.png`;
    const now = new Date();
    const user = await User.create({
        name: name,
        password: password,
        number: number,
        avatar: avatar
    });
    const res = {
        id: user.dataValues.id,
        name: user.dataValues.name,
        number: user.dataValues.number,
        avatar: user.dataValues.avatar
    };
    ctx.session.sign_info = res;
    ctx.response.body = res;
};

// 登录
var fn_sign_in = async (ctx, next) => {
    const number = ctx.request.body.number || '';
    const password = ctx.request.body.password || '';
    const user = await User.findAll({
        where: {
            number: number
        }
    });
    const userData = user[0].dataValues;
    let res = {};
    if (userData && userData.password === password) {
        res.msg = 'success';
        res.data = {
            id: userData.id,
            name: userData.name,
            number: userData.number,
            avatar: userData.avatar
        };
        ctx.session.sign_info = res.data;
    } else {
        res.msg = 'error';
    }
    ctx.response.body = res;
};

// 登出
var fn_sign_out = async (ctx, next) => {
    ctx.session.sign_info = null;
    ctx.response.body = 'ok';
};

module.exports = {
    'POST /api/sign_up': fn_sign_up,
    'POST /api/sign_in': fn_sign_in,
    'POST /api/sign_out': fn_sign_out
};