// 基本api接口路由

import BaseApi from '../controller'
import Router from 'koa-router'


const router = new Router()    
for(let k in BaseApi){
    const url = '/api/' + k
    console.log(url)       
    router.post(url,BaseApi[k])
}
export default router
