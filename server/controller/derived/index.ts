import { Models } from '../../models'
import { getData, addData, updateData, deleteData} from './crud'
import { Ctx } from '../../interface/http'

// 获取集合模型名称
const matchModelName = (string:string)=>{    
    const res = string.match(/\/api\/(.*)(\?)?/)    
    return res[1].split('?')[0]
}

// 封装请求参数
const formatQuery = (query) => {
    const querys = {
        content:{},
        filter:{}
    }
    for( let k in query ){
        if(['pageSize','pageNum'].indexOf(k)>-1){
            querys.filter[k] = query[k]
        }else {
            querys.content[k] = query[k]
        }
    }
    return querys
}



// 所有与网站数据相关的http请求都会调用此方法，可以根据请求的URL来得到需要操作的数据集合
export const CrudTable = async(ctx:Ctx, next)=>{ 
    const modelName = matchModelName(ctx.request.url)   // 根据url获取数据库中的集合  
    const Model     = Models[modelName]       
    const method    = ctx.request.method                  // 根据参数执行不同的数据库操作    
    const querys    = formatQuery(ctx.request.body)

    let res;
    switch(method) {        
        case 'GET':
            res = await getData(querys,Model)
        break;
        case 'POST':
            res = await updateData(querys,Model)
        break;
        case 'PUT':
            res = await addData(querys,Model)
        break;
        case 'DELETE':
            res = await deleteData(querys,Model)
        break;
    }    
    if(res){
        ctx.status = 200
        ctx.body = {
            info: true,
            data: res
        }
   }else{
        ctx.status = 201
        ctx.body = {
            info: false,
            data: res
        }
   }      
}

export const getDerivedTablesInfo = async (ctx:Ctx, next) => {
    const { Derived } = Models
    const res = await Derived.find().exec()
    if(!res) {
        throw Error('查找失败')
    }
    const tableList = res.map( table => {
        const model = Models[table.name]
        const count = model.count()
        table.count = count
        return table
    })    
    ctx.status = 200
    ctx.body = {
        info: false,
        data: tableList
    }
}