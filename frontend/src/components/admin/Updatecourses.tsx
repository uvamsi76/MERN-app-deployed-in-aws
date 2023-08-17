import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react"
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
            <Grid item lg={8} md={12} sm={12}>
                    <div style={{display:"flex",justifyContent:"center",zIndex:2}}>
                        <Mediacard course={course} ispage={false}/>
                    </div>
                </Grid>
                <Grid item lg={4} md={12} sm={12}>
                    <div style={{display:"flex",justifyContent:"center",zIndex:2}}>
                        <Coursecard course={course}/>
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

    