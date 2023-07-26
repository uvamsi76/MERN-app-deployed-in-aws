import express from "express";
const router = express.Router();

router.use('/get',(req,res,next)=>{
    return res.send({"message":"route working"});
})

export default router;