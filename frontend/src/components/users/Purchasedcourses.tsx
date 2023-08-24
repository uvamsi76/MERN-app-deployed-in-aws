import { useRecoilState } from "recoil"
import { publishedcourseState, purchasedcourseState } from "../../store/course"
import { useEffect, useState } from "react"
import { ec2 } from "../../assets/var"
import Mediacard from "../Coursecard"
import { Grid, Link, Typography } from "@mui/material"

export function Purchasedcourses(){
    // const [purchasedcourses,Setpurchasedcourses]=useRecoilState(purchasedcourseState)
    const [purchasedCourses,setpurchasedCourses]=useState([])
    const token="Bearer "+localStorage.getItem("token");
    const name=localStorage.getItem("user")
    var username:string=" "
    if (name){
        username=name
    }
    
    useEffect(()=>{
        fetch(ec2+"/users/purchasedCourses",{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',"Authorization":token,"user": username},
        })
        .then((res)=>{res.json()
            .then((data)=>{
                // Setpurchasedcourses(data.purchasedCourses)
                setpurchasedCourses(data.purchasedCourses)
                console.log(data.purchasedCourses)
        })})
    },[])
    
    // purchasedCourses=purchasedcourses || purchasedCourses.length
    if(purchasedCourses.length){
        return( 
            <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",padding:"8%"}}>
                {purchasedCourses.map((course)=>(
                    <div key ={course} style={{display:"flex",justifyContent:"center",margin:20}}>
                        <Mediacard course={course} ispage={false}/>
                    </div>
                ))}
            </div>
        )
    }else{
        const src='https://imgs.search.brave.com/mwbKF5BxumR-yKfilcAScspWPqDbmAqwX6zLuuo160Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDY0/MzkyNjQ5L3Bob3Rv/L3VoLW9oLXNpZ24u/anBnP2I9MSZzPTE3/MDY2N2Emdz0wJms9/MjAmYz1ybVFqU1Vf/RjJiM0dhQU5xLWhm/cHZtS0xMNm0yR1JY/T1hBNGZmNUFQNGxr/PQ'
        return(
            <div>
                <Grid >
                    <Grid lg={8}>
                        <img src={src} alt="uh-ohh" />
                    </Grid>
                    <Grid style={{display:'flex'}}>
                        <Typography variant="h3" style={{color:"red",marginRight:"1%"}}>Looks Like you dont have any purchased courses </Typography>
                        <Typography variant="h3" > <Link href="/" style={{color:"red"}}> explore courses</Link> </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}