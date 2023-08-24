import { Button, Card, Grid, Typography } from "@mui/material";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil";
import {courseState} from "../store/course"
import { ec2 } from "../assets/var";
import StarIcon from '@mui/icons-material/Star';

// type MyComponentProps = {course:Coursetype}

export function Course(){
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

    async function handlepurchase(){
        const token= "Bearer "+localStorage.getItem("token");
        await fetch(ec2+'/users/courses/'+courseid, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , "Authorization":token},
                }).then((res)=>{res.json().then((data)=>{
                        console.log(data.message)
                })})
    }

    if(course){
        return(
            <div >
                <Toplayer title={course.title}/>
                <Grid container>
                    <Grid item lg={8} md={12} sm={12}>
                        <div style={{display:"flex",justifyContent:"center",zIndex:2}}>
                            <Button variant="contained" style={{margin:"10%",marginLeft:"-30%"}} onClick={()=>{handlepurchase()}}>
                                Enroll Now
                            </Button>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12}>
                        <div style={{display:"flex",justifyContent:"center",zIndex:2}}>
                            <Coursecard/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function Toplayer({title}){
    return(
        <div>
            <div style={{width:"100vw",height:450,backgroundSize:"cover",backgroundColor:"#f4f4fc", zIndex: 0}}></div>
            <div style={{ marginLeft:"10%",height:"3%",width:"50%", justifyContent: "center"}}>
                <Typography style={{marginTop:"-20rem",color: "#3c7ddc", fontWeight:"bold",backgroundColor:"#ebedf6",boxShadow: '0px 0px 400px rgba(202,215,226,255)'}} variant="h2" >
                    {title}
                </Typography>
                
            </div>
            
        </div>
    )
}

function Coursecard(){
          return(
              <Card style={{padding:20, borderRadius:"0.5vw",width:"25rem",height:"25rem",marginTop:"-10rem"}} elevation={20}>
                  <div style={{height:"20%"}}>
                        <Typography variant="h5" style={{fontFamily:"Arial",fontSize:"150%",fontWeight:"bold",marginTop:"1%"}}>Course</Typography>
                        <Typography variant="subtitle1" style={{fontFamily:"Arial",fontSize:"80%",color:"gray"}}>Gain insight into a topic and learn the fundamentals</Typography>
                        <hr style={{marginTop:"1%"}}/>
                  </div>
                  <div style={{height:"60%"}}>
                        <div style={{display:"flex",marginTop:"5%" }}>
                                <Typography style={{paddingRight:10,fontFamily:"Arial",fontSize:"140%",fontWeight:"bold"}} variant="h5">4.6 </Typography>
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
