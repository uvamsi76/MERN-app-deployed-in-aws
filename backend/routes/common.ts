import express, {Request, Response,NextFunction, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"


const  commonrouter=express.Router();
 commonrouter.use(bodyParser.json())
 commonrouter.use(express.json());


 commonrouter.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
  });


  export default commonrouter;