import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users } from "./db";
const app=express();
const PORT =3000;
app.use(bodyParser.json())
app.use(cors())
const SECRET="Secret"
function cuser(username:string):Boolean{
    return true;
}
function authentication(req:Request,res:Response,next:NextFunction){
    const header=req.headers["authorization"];
    if(header){
        const token =header.split(' ')[1];
        jwt.verify(token,SECRET,(err,data)=>{
            if(err){
                console.log(err);
                res.status(403).send("unauthorised")
            }
            else{
                console.log(data);
                next();
            }
        });
        return
    }
    else{
        res.status(401)
    }
}

app.post('/login',async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password} =req.body;
    const user = await Users.findOne({ username, password });
    if(user){
        const payload={"username":username,"password":password}
        const expiresIn = '1h';
        const jwtoken=jwt.sign(payload,SECRET,{expiresIn});
        const token="Bearer "+jwtoken
        res.status(200).json({"token":token})
    }

})

app.post('/signup',async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password} =req.body;
    const user = await Users.findOne({ username });
    console.log(user)
    if(user){
        res.status(404).json({"message":"user already present please sign in"})
    }
    else{
        const newUser=new Users({username,password})
        const payload={"username":username,"password":password}
        const jwtoken=jwt.sign(payload,SECRET,{expiresIn:'1h'});
        const token="Bearer "+jwtoken
        newUser.save()
            .then((savedTodo) => {
                res.status(201).json({savedTodo,token});
             })
            .catch((err) => {
                res.status(500).json({ error: 'Failed to create a new todo' });
                });
        // Users.push(payload)
    }

})
mongoose.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/track', { dbName: "track" });
    // jwt.sign(data,SECRET,{expiresIn:'1h'})
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})