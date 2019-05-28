
import Koa from 'koa'
import koaBody from 'koa-body'
import router  from './server/router/basel'

export const app = new Koa()
app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,() => {
    console.log('The server is running at http://localhost:' + 3000)
})
