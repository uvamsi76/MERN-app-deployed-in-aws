import  Mongoose  from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    DOB:{
        type:Date
    },
    email:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    UID:{
        type:String
    },
    issubscribed:{
        type:Boolean,
        default:false
    },
    purchasedcourses:[{
        courseid: {type:String}
}],
subscriptionexpiry:{
    type:Date,
    default:()=>{Date.now()}
} 
});

module.exports=Mongoose.model('Users',userSchema)