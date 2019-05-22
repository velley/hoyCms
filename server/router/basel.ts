// 基本api接口路由

import BaseApi from '../controller'
import Router from 'koa-router'


const router = new Router()    
for(let k in BaseApi){
    const url = '/api/' + k
    console.log(url)
    if(k==='createTable'){
        console.log('dd')
        router.post(url,BaseApi[k])
    }else {
        router.get(url,BaseApi[k])        
        router.post(url,BaseApi[k])
        router.put(url,BaseApi[k])
        router.delete(url,BaseApi[k])
    }        
}
export default router
