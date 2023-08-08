import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "./db";
const app=express();
const PORT =3000;
app.use(bodyParser.json())
app.use(cors())

app.use(express.json());

const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

const authenticateJwt = (req:Request,res:Response,next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      req.headers["user"] = payload.username;
      req.headers["userid"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/nothing', { dbName: "nothing" });

app.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.headers["username"] });
  if (!admin) {
    res.status(403).json({msg: "Admin doesnt exist"})
    return
  }
  res.json({
      username: admin.username
  })
}); 

app.post('/admin/signup', (req, res) => {
  const { username, password } = req.body;
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

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,username});
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
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

app.get('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/courses', async (req, res) => {
  const courses = await Course.find({published: true});
  res.json({ courses });
});

app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.headers["user"] });
    if (user) {
      user.purchasedCourses.push(course.id);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.headers["user"] }).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));