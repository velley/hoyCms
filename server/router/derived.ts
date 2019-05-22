// 对关键变量Models进行监听，派生集合模型生成时会自动创建相应的接口路由

import { app } from '../../server'
import Router from 'koa-router'
import { CrudTable } from '../controller/derived'

export function listen(Models) {
    return new Proxy(Models, {
        set: function(target, key:string, value:any): any {    
            const url = '/api/' + key 
            console.log(url)
            const router = new Router()
            router.get(url,CrudTable)
            app.use(router.routes()).use(router.allowedMethods())
            target[key] = value
            return true
        }
    })
}
