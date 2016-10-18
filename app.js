const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cacheControl = require('koa-cache-control');
// const session = require('koa-session');
const convert = require('koa-convert');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const app = new Koa();
const controller = require('./controller');

import session from 'koa-session2';

app.keys = ['sess'];

app.use(convert(cacheControl({
    maxAge: 25000000,
    public: true
})));

app.use(convert(conditional()));
app.use(convert(etag()));

app.use(session({
    key: "sign_info",
    maxAge: 250000000,
    httpOnly: false,
    domain: 'localhost'
}, app));
app.use(bodyParser());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    console.log(ctx.session);
    await next();
});

app.use(controller());

app.use(router.routes());

// 在端口7000监听:
app.listen(7000);
console.log('app started at port 7000...');