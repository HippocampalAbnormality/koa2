const Router = require('koa-router');
const ajax = new Router();

// 这个写法有问题，端口404
ajax.options('/ajax', (ctx) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:4445');
  ctx.body = '';
})
ajax.get('/ajax', (ctx) => {
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:4445')
  if (!ctx.query.name || !ctx.query.pass) {
    return ctx.status = 400;
  } else {
    ctx.response.message = 'ok了';
    // 关于cookie汉字的问题，这个挺坑，汉字会报错
    // https://www.jianshu.com/p/9addbe59680f
    ctx.cookies.set('_uid', 'sdf', {
      domain: 'localhost',
      path: '/a',
      maxAge: 60000, // 这个有效时间注意，写的短会让你在页面看不见以至于环艺人生
      expires: new Date('2018-08-13'),
      httpOnly: false,
      overwrite: false,
    })
    ctx.response.body = JSON.stringify({
      code: 0,
      msg: '登陆成功',
      data: {},
    })
  }
})

module.exports = ajax;