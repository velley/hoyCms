// cms系统中动态的集合结构(该文件输出一个方法，根据传入的对象创建正确的Schema实例)
import { Schema } from 'mongoose'

const returnType = (str: string):any => {
    switch(str) {
        default:
        case 'String':
          return String
        break;
        case 'Number':
          return Number
        break;
        case 'String':
          return String
        break;
        case 'String':
          return String
        break;
    }
}

export const createSchema = (structure:any):Schema => {    
    for (let k in structure){
        structure[k].type = returnType(structure[k].type)
    }  
    return new Schema(structure)
}