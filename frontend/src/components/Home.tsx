import { useEffect, useState } from "react"
import Mediacard from "./Mediacard"
// import {isSpecialState} from "../store/isSpecial"
// import {useRecoilValue} from "recoil"
// const styles = {
//     // Default styles here
//     display:"flex",justifyContent:"center",flexWrap: "wrap"
//   };
// const isSpecial =useRecoilValue(isSpecialState); 
//   if (isSpecial) {
//     Object.assign(styles, {
//       // Special styles here
//     });
//   }

//   return (
//     <div style={styles}>
//       {/* Content */}
//     </div>
//   );
export function Home(){
        const [courses,setCourses]=useState<any[]>();
        const token= "Bearer "+localStorage.getItem("token");
        useEffect(()=>{
                fetch('http://localhost:3000/courses', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , "Authorization":token},
                }).then((res)=>{res.json().then((data)=>{
                        setCourses(data.courses)
                        console.log(data.courses)
                })})
        },[])
        if(courses){
    return (
        <div>
    <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",padding:"8%"}}>
        {courses.map((course)=>(
            <div key ={course._id} style={{display:"flex",justifyContent:"center",margin:20}}>
                <Mediacard  course={course}/>
            </div>
                ))}
            
            
                
        </div>
        </div>
)
}
}