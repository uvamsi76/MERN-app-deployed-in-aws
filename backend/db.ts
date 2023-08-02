import { stat } from "fs";
import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:String,
    Uid:Number,
    todos:{
        type:[String],
        default:[]
    }
});

const todoSchema=new mongoose.Schema({
    todoid:String,
    todotitle:String,
    tododesc:String,
    todostatus:String
})
export const Users=mongoose.model('Users',UserSchema);
export const Todos=mongoose.model('Todos',todoSchema);