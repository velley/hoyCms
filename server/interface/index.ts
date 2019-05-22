import { Document } from 'mongoose'


export interface Istructure extends Document {
    name: string;
    name_zh?: string;
    type: string;
    count?:number;
    letters?: [string];
    structure: string
}

export interface Iadmin extends Document {
    name: string;
    password: string;
    level:number;
    resource:[string];
    status:string;
}
