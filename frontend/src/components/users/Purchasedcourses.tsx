import { useRecoilState } from "recoil"
import { publishedcourseState, purchasedcourseState } from "../../store/course"
import { useEffect } from "react"
import { ec2 } from "../../assets/var"
import Mediacard from "../Coursecard"

export function Purchasedcourses(){
    const [publishedcourses,Setpublishedcourses]=useRecoilState(publishedcourseState)
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
        }).then((res)=>{res.json().then((data)=>{
                Setpublishedcourses(data.purchasedCourses)
                console.log(data.purchasedCourses)
        })})

    },[])
    if(publishedcourses){
        return( 
        <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",padding:"8%"}}>
            {publishedcourses.map((course)=>(
                <div key ={course._id} style={{display:"flex",justifyContent:"center",margin:20}}>
                    <Mediacard course={course} ispage={false}/>
                </div>
            ))}
        </div>
    )}
}