import { useRecoilState } from "recoil"
import { publishedcourseState } from "../../store/course"
import { useEffect } from "react"

export function Publishedcourses(){
    const [publishedcourses,Setpublishedcourses]=useRecoilState(publishedcourseState)
    useEffect(()=>{
        
    },[])
    return <h1>Publishedcourses</h1>
}