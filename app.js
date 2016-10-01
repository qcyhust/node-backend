const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controller = require('./controller');

app.use(bodyParser());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(controller());

app.use(router.routes());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');