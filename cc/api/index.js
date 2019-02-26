const Koa = require("koa")
const root = require("./routes/root")

new Koa()
    .use(root.routes())
    .use(root.allowedMethods())
    .listen(3000)
