import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"




const adminrouter=express.Router();
adminrouter.use(bodyParser.json())
adminrouter.use(express.json());


adminrouter.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.headers["username"] });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({
      username: admin.username
  })
}); 

adminrouter.post('/signup', (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username }).then((admin)=>{
    if(admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token ,username});
    }
  });
});

adminrouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,username});
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

adminrouter.post('/courses', authenticateJwt, async (req, res) => {
  const {title,description,price,imageLink,published}=req.body
  const admin = await Admin.findOne({ username: req.headers["user"] });
  const Author=admin?._id
  if(admin){
    const course = new Course({title,description,price,imageLink,published,Author});
    await course.save();
    if(course){
      admin.publishedCourses.push(course.id);
      await admin.save();
      res.status(200).json({ message: 'Course created successfully', courseId: course.id ,admin:admin.username});
    }
    else{
      res.status(500).json({ message: 'Course not found Internal error' });  
    }
  }
  else{
    res.status(404).json({ message: 'admin not found retry after some time' });
  }
  
});

adminrouter.get('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
  console.log(course)
});

adminrouter.put('/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

adminrouter.get('/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

// function callback(admin) {
//   if (admin) {
//     res.status(403).json({ message: 'Admin already exists' });
//   } else {
//     const obj = { username: username, password: password };
//     const newAdmin = new Admin(obj);
//     newAdmin.save();
//     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
//     res.json({ message: 'Admin created successfully', token });
//   }
// }

export default adminrouter