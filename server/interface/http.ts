import { BaseContext } from 'koa'


export interface Ctx extends BaseContext {    
    body:object;
    status:number;
}