import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users,Todos } from "./db";
const app=express();
const PORT =3000;
app.use(bodyParser.json())
app.use(cors())
const SECRET="Secret"
const c=0;
// async function generateuid(){
//     const u=await Uids.find({},{uid:1,_id:0});
//     const us=u[0]["uid"]
//     if( us != undefined){
//     const uids:Array<string>=us
//     const uidl:number=uids.length
//     console.log()
//     var uid="";
//     if(!uidl){
//         uid="U001"
//     }
//     else{
//         uid="U"+parseInt(uids[uidl-1].slice(1))+1
//     }
//     uids.push(uid)
//     const uidss=new Uids(uids)
//     uidss.save()
//     return uids
// }
// }

async function generatetid(){
    try{
    const t=await Todos.find().sort({_id:-1}).limit(1);
    var tid
    if(t[0]){
        tid="T"+String(Number(t[0]["todoid"]?.replace("T",""))+1)     
    }
    else{
        tid="T1"
    }
    return tid
}
    catch(err){
        console.log(err)
    }
    
}
function authentication(req:Request,res:Response,next:NextFunction){
    const header=req.headers["authorization"];
    console.log(header)
    if(header){
        const token =header.split(' ')[1];
        console.log(token)
        jwt.verify(token,SECRET,(err,data)=>{
            if(err){
                console.log(err);
                res.status(403).send("unauthorised")
            }
            else{
                console.log(data)
                res.setHeader('username', JSON.stringify(data));
                next();
                }
        });
        return
    }
    else{
        res.status(403).send("unauthorised")
    }
}

app.post('/login',async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password} =req.body;
    const user = await Users.findOne({ username, password });
    if(user){
        const payload={username}
        const expiresIn = '1h';
        const jwtoken=jwt.sign(payload,SECRET,{expiresIn});
        const token="Bearer "+jwtoken
        res.setHeader('authorization', token);
        res.status(200).json({"token":token})
    }

})

app.post('/signup',async (req:Request,res:Response,next:NextFunction)=>{
    const {username,password} =req.body;
    const user = await Users.findOne({ username });
    console.log(user)
    if(user){
        res.status(404).json({"message":"username already used or user already present please sign in"})
    }
    else{
        const Uid = c+1
        const newUser=new Users({username,password,Uid})
        // const Uid=await generateuid();
        const payload={"username":username,"password":password}
        const jwtoken=jwt.sign(payload,SECRET,{expiresIn:'1h'});
        const token="Bearer "+jwtoken
        newUser.save()
            .then((saveduser) => {
                res.status(201).json({saveduser});
             })
            .catch((err) => {
                res.status(500).json({ error: err });
                });
        // // Users.push(payload)
    }

})

app.get('/todos',authentication,async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.headers.username)
    const username=req.headers.username;
    const todos= await Users.findOne({ username },{todos:1,_id:0});
    if(todos){
        res.status(200).json({"Todos":todos});
    }
})

app.post('/todos',authentication,async (req:Request,res:Response,next:NextFunction) => {
    const g=req.body;
    const username=req.headers.username;
    if(g){
        const {todotitle,tododesc,todostatus}=g
        const todoid=await generatetid()
        const newtodo =new Todos({todotitle,tododesc,todostatus,todoid});
        Users.findOneAndUpdate({username},{ $push: { todos: todoid } },{ new: true } // This option returns the modified document rather than the original one
              )
                .then(updatedDocument => {
                  if (updatedDocument) {
                    console.log('Document updated:', updatedDocument);
                    newtodo.save().then((savedtodo)=>{
                        res.status(200).json(savedtodo);
                    }).catch((err)=>{
                        res.status(400).json({"message":err})
                    })
                  } else {
                    console.log('Document not found.');
                    res.status(400).json({"message":"Document not found."})
                  }
                })
                .catch(error => {
                  console.error('Error updating document:', error);
                  res.status(400).json({"message":error})   
                });
    }
    else{
        res.status(400).json({"message":"please provide valid goal"})
    }
})

app.put('/Todos/:todoId',async (req:Request,res:Response,next:NextFunction)=>{
    const todo = await Todos.findByIdAndUpdate(req.params.todoId, req.body, { new: true });
  if (todo) {
    res.json({ message: 'todo updated successfully' });
  } else {
    res.status(404).json({ message: 'todo not found' });
  }
})

app.delete('/Todos/:todoId',async (req:Request,res:Response,next:NextFunction)=>{
    const todo = await Todos.findByIdAndDelete(req.params.todoId);
  if (todo) {
    res.json({ message: 'todo deleted successfully' });
  } else {
    res.status(404).json({ message: 'todo not found' });
  }
})

app.delete('/delmyacc/:uname' ,async (req:Request,res:Response,next:NextFunction)=>{
    const username =req.params.uname;
    const user= await Users.findOneAndDelete({username});
    if(user){
        res.status(200).send("account deleted successfully")
    }
    else{
        res.status(400).send("account not found")
    }
})

mongoose.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/track', { dbName: "track" });
    // jwt.sign(data,SECRET,{expiresIn:'1h'})
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`)
})