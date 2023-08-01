import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    username:String,
    password:String
});

const GoalSchema=new mongoose.Schema({
    goalname:String,
    goaldesc:String
})
export const Users=mongoose.model('Users',UserSchema);
export const Goals=mongoose.model('Goals',GoalSchema);