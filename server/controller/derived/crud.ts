// 增
export const addData = (query,model)=>{
    const doc = new model(query.content)
    doc.save()
}

// 删
export const deleteData = (query,Model)=>{

}

// 改
export const updateData = (query,Model)=>{

}

// 查
export const getData = async (querys,model)=>{            
    let doc = model.find(querys.content)
    if(querys.page.pageNum){
        doc = doc.skip((querys.filter.pageNum - 1)*querys.rest.pageSize)
    }
    if(querys.page.pageSize){
        doc = doc.limit(querys.filter.pageSize)
    }   
    const res = await doc.exec()    
    return res
}