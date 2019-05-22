// cms系统中两个固定的集合结构：admins 与 Deriveds

import { Schema } from 'mongoose'

export const AdminSch: Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    password: {
        type:String,
        default:'666666'
    },
    level:{
        type:Number,
        default:1
    },
    resource:Array,
    status:{
        type:String,
        default:'normal'
    }
})

export const DerivedSch: Schema = new Schema({
    name:{
        type:String,
        required:true
    },
    name_zh: String,
    model: {
        type:String,
        required:true
    },
    letters:String,    
    structure:{
        type:String,
        required:true
    }
})