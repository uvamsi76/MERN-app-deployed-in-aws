import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil";
import {courseState} from "../../store/course"
import { ec2 } from "../../assets/var";
import Mediacard from "../Coursecard";
import StarIcon from '@mui/icons-material/Star';

export function Updatecourses(){
    const {courseid} =useParams()
    const [course,setCourse] = useRecoilState(courseState)
    const token= "Bearer "+localStorage.getItem("token");
    useEffect(()=>{
        fetch(ec2+'/admin/courses/'+courseid, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , "Authorization":token},
                }).then((res)=>{res.json().then((data)=>{
                        setCourse(data.course)
                        console.log(data.course)
                })})

    },[])
    if(course){
    return(
        <div >
            <Toplayer title={course.title}/>
            <Grid container>
            <Grid item lg={4} md={12} sm={12}>
                    <div style={{display:"flex",justifyContent:"center",zIndex:2}}>
                        
                    </div>
                </Grid>
                <Grid item lg={8} md={12} sm={12}>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Updatecard/>
                    </div>
                </Grid>
            </Grid>
            
        </div>
    )
}
}
{
    /* <div style={{color:"red",paddingBottom:"0%",padding:"0%",margin:"10%",justifyContent:"center",boxShadow: '0px 0px 400px rgba(0, 0, 0, 0.5)'}}>
    <Typography variant="h4"  >course page </Typography>
    </div> */}

function Updatecard(){
    const course = useRecoilValue(courseState)
    const [title,setTitle]=useState(course?.title)
    const [description,setDescription]=useState(course?.description)
    const [price,setPrice]=useState(course?.price)
    const [imageLink,setImageLink]=useState(course?.imageLink)
    async function handleupdate(){
        const token='Bearer '+localStorage.getItem("token")
        const user=localStorage.getItem("user")
        if(course && token && user){
        const response = await fetch(ec2+`/admin/courses/${course._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,"Authorization":token,"user":user},
            body: JSON.stringify({title,description,price,imageLink })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        console.log(data.message)
        window.location.href=`/updatecourses/${course._id}`
    }
    else{
        console.log("error")
    }
}
    return (
            <Card elevation={20} style={{display:"flex", width:"50%",justifyContent:"center",borderRadius:"0.5vw"}}>
                <div style={{margin:"5%",display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"}}>
                    <Typography variant="h5">Update your course here</Typography>
                    <TextField variant="outlined" label="title"       onChange={(e)=>{setTitle(e.target.value)}} style={{marginTop:"5%"}}/>
                    <TextField variant="outlined" label="description" onChange={(e)=>{setDescription(e.target.value)}} style={{marginTop:"5%"}}/>
                    <TextField variant="outlined" label="price"       onChange={(e)=>{setPrice(Number(e.target.value))}} style={{marginTop:"5%"}}/>
                    <TextField variant="outlined" label="imageLink"   onChange={(e)=>{setImageLink(e.target.value)}} style={{marginTop:"5%"}}/>
                    <div style={{marginTop:"5%"}}>
                    <Button variant="contained" style={{padding:"1%",paddingLeft:"3%",paddingRight:"3%"}} onClick={async ()=>{await handleupdate()}}> Update </Button>
                    </div>
                    {/* title,description,price,imageLink,published,Author */}
                </div>
            </Card>
    )
}
function Toplayer({title}){
    return(
        <>
            <div style={{width:"100vw",height:450,backgroundSize:"cover",backgroundColor:"#f4f4fc", zIndex: 0}}>
            </div>
            <div style={{ marginLeft:"10%",height:"3%",width:"50%", justifyContent: "center"}}>
                <Typography style={{marginTop:"-20rem",color: "#3c7ddc", fontWeight:"bold",backgroundColor:"#ebedf6",boxShadow: '0px 0px 400px rgba(202,215,226,255)'}} 
                    variant="h2" >
                    {title}
                </Typography>
            </div>
        </>
    )
}

const Coursecard=(course)=>{
    const ilink=course.imageLink;
    const tle=course.title
          return(
              <Card style={{padding:20, borderRadius:"0.5vw",width:"25rem",height:"25rem",marginTop:"-10rem"}} elevation={20}>
                  <div style={{height:"20%"}}>
                        <Typography variant="h5" style={{fontFamily:"Arial",fontSize:"150%",fontWeight:"bold",marginTop:"1%"}}>Course</Typography>
                        <Typography variant="subtitle1" style={{fontFamily:"Arial",fontSize:"80%",color:"gray"}}>Gain insight into a topic and learn the fundamentals</Typography>
                        <hr style={{marginTop:"1%"}}/>
                  </div>
                  <div style={{height:"60%"}}>
                        <div style={{display:"flex",marginTop:"5%" }}>
                                <Typography style={{paddingRight:10,fontFamily:"Arial",fontSize:"1.1vw",fontWeight:"bold"}} variant="h5">4.6 </Typography>
                                <StarIcon style={{color:"#3c7ddc"}}/>
                                <Typography variant="subtitle1" style={{fontFamily:"Arial",fontSize:"80%",color:"gray"}}>(47 reviews)</Typography>
                        </div>
                        <div>
                                <Typography variant="h5" style={{fontFamily:"Arial",fontSize:"150%",fontWeight:"bold",marginTop:"5%"}}>Begginer Level</Typography>
                                <Typography variant="subtitle1" style={{fontFamily:"Arial",fontSize:"80%",color:"gray",marginTop:"1%"}}>Recommended experience</Typography>
                                <Typography variant="h5" style={{fontFamily:"Arial",fontSize:"150%",fontWeight:"bold",marginTop:"5%"}}>14 hours (approximately)</Typography>
                                <Typography variant="h5" style={{fontFamily:"Arial",fontSize:"150%",fontWeight:"bold",marginTop:"5%"}}>Flexible schedule</Typography>
                                <Typography variant="subtitle1" style={{fontFamily:"Arial",fontSize:"80%",color:"gray",marginTop:"1%"}}>Learn at your own pace</Typography>
                        </div>
                        <hr/>
                        <Button style={{padding:0,fontFamily:"Arial",fontSize:"80%",fontWeight:"bold",color:"#3c7ddc",marginTop:"2%",marginBottom:"5%",textTransform:"lowercase"}}>view course modules</Button>
                  </div>
                        
              </Card>
          )
  }
            {/* <Grid  item xs={12}>
                
        //     {/* <img style={{width:"120rem",height:"40rem"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ALNQGlCTAxM5UF811PGu6/40d065b0da029c430a3dd5c62a978912/UoL-Campus-Header.jpg?auto=format%2Ccompress&dpr=1&w=1024&h=768&q=30" alt="image" /> */}
        // </Grid> 
    //style={{backgroundColor:"#e9f2ff",width:"120rem",height:"40rem",zIndex:0}}*/}


    // backgroundImage:"url('https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ALNQGlCTAxM5UF811PGu6/40d065b0da029c430a3dd5c62a978912/UoL-Campus-Header.jpg?auto=format%2Ccompress&dpr=1&w=1024&h=768&q=30')"

    