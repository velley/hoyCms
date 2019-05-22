import { createTable } from './createTable'
import { getDerivedTablesInfo } from './derived'


let Api:any = {
    createTable,    //方法：创建新集合
    getDerivedTablesInfo //获取派生集合的汇总信息
}

// for(let k in Models) {    
//     Api[k] = dealWithTable //方法：集合的增删改查
// }

export default Api