import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { ec2 } from "../../assets/var"
import { Button } from "@mui/material"

export function Deletecourse(){
    const nav=useNavigate()
    const {courseid}=useParams()
    const token= "Bearer "+localStorage.getItem("token")
    const username=localStorage.getItem("user")
    
    async function handleDelete(){
        const response=await axios.delete(ec2+`/admin/delete/${courseid}`,{headers:{'Content-Type': 'application/json',"Authorization":token,"user": username}})
        const data=await response.data
        alert(data.message)
        nav('/mycourses')
    }
    return(
        <div>
            <h1>Are you sure want to Delete course {courseid}</h1>
            <Button onClick={()=>{handleDelete()}}>Yeahh!</Button>
            <Button onClick={()=>{nav('/mycourses')}}>Nahhh!</Button>
        </div>
    )
}