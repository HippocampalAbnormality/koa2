const koa2 = require('koa2');
const views = require('koa-views');
const static = require('koa-static');
const Router = require('koa-router');
const path = require('path');

const app = new koa2();
const home = new Router();
const ajax = require('./ajax');

home.get('/a', async (ctx) => {
  const data = {
    title: 'a',
    cookie: '',
  }
  if (ctx.cookies.get('_uid')) {
    data.cookie = ctx.cookies.get('_uid');
  }
  await ctx.render('a', data);
})
home.get('/b', async (ctx) => {
  await ctx.render('b');
})


// 这里虽然写了默认拓展名，下面不用写了，但我并引用ejs插件，是koa-views本身就用ejs？
app.use(views(`${__dirname}/views`, {
  extension: 'ejs',
}));

// 静态资源
app.use(static(`${__dirname}/public`, {
  maxage: 60000,
}));

// 这里不用async会报警高，说promise的reject时没有代码控制会中断node进程
app.use(home.routes(), home.allowedMethods())
app.use(ajax.routes(), ajax.allowedMethods())

app.listen(3000, () => {
  console.log('开启本地3000端口');
});