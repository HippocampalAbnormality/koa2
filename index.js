const koa = require('koa2');
const app = new koa();
const fs = require('fs');
const path = require('path');

// app.use(async (ctx, next) => {
//   await next();
//   ctx.body = 'Hello Koa';
//   console.log(1)
// });

// // response
// app.use(ctx => {
//   // ctx.body = 'Hello Koa';
//   // ctx.response.type = 'text/html';
//   ctx.response.body = 'Hello, koa2!';
//   console.log(2)
// });

// 111
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url} 111`); // 打印URL
  await next(); // 调用下一个middleware
});

// 222
app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms 222`); // 打印耗费时间
});

// 333
app.use(async (ctx, next) => {
  console.log('1 333')
  await next();
  // const data = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
  if (ctx.request.path === '/' || ctx.request.path === '') {
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
  }
  // ctx.res.statusCode = '200';
  // ctx.res.end(data);
  console.log('2 333')
});

// a
app.use((ctx, next) => {
  if (ctx.request.path === '/a') {
    console.log('aaa')
    ctx.response.body = '<script>alert(1)</script>';
    next();
  }
})
// b
app.use((ctx, next) => {
  console.log('bbb')
  // if (ctx.request.path === '/b') {
  // }
})

app.listen(3000);

// 问题：
// 1、以前出现同意中间件两次执行，因为文档的favorite.icon也请求的缘故

// 回答：
// 1、不是不知道中间件你执行顺序吗，现在清晰了，去掉icon请求的干扰，就是你猜想的逻辑顺序
// 2、你看到的async和await成对出现，但中间件本身就是按你调用的顺序调用，跟async本身无关，没有async依然是next控制下一步
// 3、看46到56行代码，如果a中不调用next，就不会执行b的中间件