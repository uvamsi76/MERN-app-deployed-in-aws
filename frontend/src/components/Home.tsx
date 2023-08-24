import { useEffect, useState } from "react"
import {Coursecard} from "./Coursecard"
import {ec2} from "../assets/var"
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Home(){
    const [courses,setCourses]=useState<any[]>();
    const token= "Bearer "+localStorage.getItem("token");

    const nav=useNavigate()

    useEffect(()=>{
        fetch(ec2+'/courses', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , "Authorization":token},
        })
        .then((res)=>{res.json()
            .then((data)=>{
                setCourses(data.courses)
                console.log(data.courses)
            })
        })
    },[])
    
    if(courses){
        return (
            <div style={{display:"flex",justifyContent:"center"}}>
                <Grid item lg={12} md={12} sm={12} xs={12}container>
                    <Grid item lg={12} container>
                            <Grid item lg={6}  >
                                <Grid item lg={8} style={{display:"flex",justifyContent:"center",flexDirection:"column",flexWrap: "wrap",marginLeft:"40%"}}>
                                    <Typography variant="h1" style={{marginTop:"10%",fontFamily:"Ubuntu",color:"black",fontWeight:550,fontSize:80}} >Learn without limits </Typography>
                                    <Typography variant="subtitle1" style={{marginTop:"5%"}}>Start, switch, or advance your career with more than 5,800 courses, Professional Certificates, 
                                        and degrees from world-class universities and companies.</Typography>
                                    <div style={{display:"flex", marginTop:"5%",height:"30%"}}>
                                        <Button variant="contained" size="large" 
                                            style={{borderRadius:"0.5vw",width:"50%",margin:"2%",backgroundColor:"#0056d2",fontWeight:550}} onClick={()=>{
                                                nav('/signup_user')
                                            }}>
                                                Join for free
                                        </Button>
                                        <Button variant="outlined" size="large"
                                            style={{borderRadius:"0.5vw",width:"50%",margin:"2%",borderWidth:"3px",borderStyle:"solid",fontWeight:550,borderColor:"#0056d2"}} onClick={()=>{
                                                nav('/signup_admin')
                                            }}>
                                                Try coursera for buisiness
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item lg={6}>
                                <Grid item >
                                    <img style={{marginLeft:"20%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&dpr=1&w=459&h=497&q=40" alt="coursera logo" />
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item lg={12}>
                        <div style={{padding:0,display:"flex",justifyContent:"center",flexDirection:"column",width:"100%",height:"15vw",backgroundColor:"#f4f5f4"}}>
                            <div style={{display:"flex",justifyContent:"center",fontWeight:550}}>
                                <Typography variant="h5" fontWeight={"bold"} marginRight={"15px"}>We collaborate with</Typography>
                                <Typography variant="h5" color={"#0056d2"} fontWeight={"bold"}>{"300+ leading universities and companies"}</Typography>
                            </div>
                            <div style={{display:"flex",justifyContent:"center",padding:"1%"}}>
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/77hmeEJo3ZPlURCU02fD52/aa37b7f7b52285ba350acac62d8af5c1/illinois-3.png?auto=format%2Ccompress&dpr=1&w=&h=32" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/6XkOucZz6pMLV5DPvXCgCL/1777129a58b0a62b237bd28e9956afe8/duke-3.png?auto=format%2Ccompress&dpr=1&w=&h=32" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1c6RjBHi3Lqb9QpWxje7iA/b529f909c5230af3210ba2d47d149620/google.png?auto=format%2Ccompress&dpr=1&w=&h=37" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=1&w=&h=55" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3toC4I7jbWxiedfxiyNjtT/735faeaf976a9692f425f8c3a7d125dc/1000px-IBM_logo.svg.png?auto=format%2Ccompress&dpr=1&w=&h=32" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/FHOd44z40jTFsSSao84AM/d1e357f5650a23bf2936114112d44445/imperial.png?auto=format%2Ccompress&dpr=1&w=&h=35" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4FSFmNXuDIzTvFb7n0v4mK/704ae9e0a7981fb6415f4cb4609bbbb3/stanford.svg?auto=format%2Ccompress&dpr=1&w=&h=27" alt="coursera logo" />
                                <img style={{padding:"1%",height:"35%"}} src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1ZeiauXe5bPProvfuIo7o2/55d005d42979ab585cdfa01f825b7d4f/penn.svg?auto=format%2Ccompress&dpr=1&w=&h=37" alt="coursera logo" />
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={12}>
                        <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",padding:"8%"}}>
                            {courses.map((course)=>(
                            <div key ={course._id} style={{display:"flex",justifyContent:"center",margin:20}}>
                                <Coursecard course={course} ispage={false} />
                            </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </div>
        )   
    }
}