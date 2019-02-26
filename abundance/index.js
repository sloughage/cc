const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const send = require('koa-send')

router.get('/test', async ctx => {
  ctx.body = {res: 'hola'}
})

app
  .use(router.routes())
  .use(async ctx => {await send(ctx, 'build/index.html')})
  .listen(3000)
