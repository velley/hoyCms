import { connect, connection as db, model, Schema, Model } from 'mongoose'
import { AdminSch, DerivedSch} from '../schema/stable'
import { createSchema } from '../schema/dynamic'
import { Iadmin, Istructure } from '../interface'
import { listen } from '../router/derived'

// 连接数据库
connect('mongodb://localhost/hoy_cms')

// 数据库连接提示
db.on('error', function(){
    console.log('数据库连接出错！')
})
db.on('open', function(){
    console.log('数据库连接成功！')
})


// 获取数据库中所有集合信息并转成Model模型，最后统一挂载到Models对象内
export const Admin: Model<Iadmin, {}>        = model('admin',AdminSch)
export const Derived: Model<Istructure, {}>  = model('derived',DerivedSch)
export const Models = {
    Admin,
    Derived
}
export const ModelsProxy = listen(Models)

// 搜索amind集合，若为空，则创建一个初始超级管理员账号
Admin.find().exec((err,doc) => {
    if(doc.length < 1) {
        console.log('系统初始化，创建超级管理员');
        const superAdmin = new Admin({
            name:'超级管理员',
            level:10
        })
        superAdmin.save()
    }else{
        console.log('管理系统初始化，可以正常登陆')
    }
})

// 搜索Derived集合，取得所有的派生集合信息，并以此创建对应的Model类型
Derived.find().exec((err,doc)=>{
    if(err){
        console.log(err)
    }else{
        console.log('对派生集合建模')
        for(let c of doc){
            const sche = createSchema(JSON.parse(c.structure))
            ModelsProxy[c.name] = model<Istructure>(c.name, sche)
        }
    }    
})

export const createModel = (name:string,sche:Schema) => {    
    ModelsProxy[name] = model(name,sche)
    return ModelsProxy[name]
}

