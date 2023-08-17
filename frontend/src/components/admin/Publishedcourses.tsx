import { useRecoilState } from "recoil"
import { publishedcourseState } from "../../store/course"
import { useEffect } from "react"
import { ec2 } from "../../assets/var"
import Coursecard from "../Coursecard"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function Publishedcourses(){
    const [publishedcourses,Setpublishedcourses]=useRecoilState(publishedcourseState)
    const token="Bearer "+localStorage.getItem("token");
    const name=localStorage.getItem("user")
    const nav=useNavigate();
    const ilink="https://as1.ftcdn.net/v2/jpg/03/32/81/80/1000_F_332818032_8dSxCnOW1SVtPlRTuioA4i0k1SY9cSzb.jpg"
    const tle="Add New Course"
    const desc="add your new course by clicking the button below"
        var username:string=" "
        if (name){
            username=name
        }
    useEffect(()=>{
        fetch(ec2+"/admin/publishedCourses",{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',"Authorization":token,"user": username},
        }).then((res)=>{res.json().then((data)=>{
                Setpublishedcourses(data.purchasedCourses)
                console.log(data.purchasedCourses)
        })})

    },[])
    if(publishedcourses){
        return( 
        <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap"}}>
            {publishedcourses.map((course)=>(
                <div key ={course._id} style={{display:"flex",justifyContent:"center",margin:20}}>
                    <Coursecard course={course} ispage={true}/>
                </div>
            ))}
            <div style={{marginTop:20}}>
                <Card elevation={4} sx={{ maxWidth: 400 }} style={{padding:10,height:"92%",width:400,backgroundColor:"f4f4fc"}}>
                    <CardMedia
                        sx={{ height: 300 }}
                        image={ilink}
                        title={tle}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {tle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {desc}
                        </Typography>
                    </CardContent>
                    <CardActions style={{display:"flex",justifyContent:"center"}}>
                        <Button variant='outlined' onClick={()=>nav('/addcourse')}> Add course</Button>
                    </CardActions>
                </Card>
            </div>
            {/* <Card elevation={4}sx={{ maxWidth: 400 }} style={{width:400,backgroundColor:"f4f4fc"}}>
                <CardMedia sx={{ height: 300 }} image="https://as1.ftcdn.net/v2/jpg/03/32/81/80/1000_F_332818032_8dSxCnOW1SVtPlRTuioA4i0k1SY9cSzb.jpg" 
                title="Add New Course"/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Add New Course
                        </Typography>
                    </CardContent>
                    <CardActions style={{display:"flex",justifyContent:"space-between"}}>
                        <Button variant="contained" onClick={()=>{nav('/addcourse')}}>Add course</Button>
                    </CardActions>
            </Card> */}
        </div>
    )}
}