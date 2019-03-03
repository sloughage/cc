const Koa = require("koa")
const root = require("./routes/root")

new Koa()
    .use(root.routes())
    .use(root.allowedMethods())
    .use(async ctx => {ctx.body = {error: "Not Found"}})
    .listen(3000)
