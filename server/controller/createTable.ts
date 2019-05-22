// 动态创建新的集合
import { Derived, createModel } from '../models'
import { createSchema } from '../schema/dynamic'

export const createTable = async(ctx, next)=>{  
    const params = ctx.request.body    
    const { 
        structure, 
        name
    }             = params
    console.log(structure)
    const schema    = createSchema(JSON.parse(structure))
    const model     = createModel(name,schema)      

    // 向Derived数据集合中插入新集合信息
    const newDoc = new Derived(params)
    newDoc.save((err,res)=>{
        if(err){
            console.log(err)
        }else{                   
            console.log(res)           
        }
    })
    ctx.status = 200
    ctx.body = {
        info: true,
        msg:'数据集合添加成功'
    }         
}

