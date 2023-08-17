import axios from "axios"
import { useState } from "react"
import { ec2 } from "../../assets/var"
import { Button, Card, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"

export function Addcourse(){
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [imageLink,setImageLink]=useState('')
    const [published,setPublished]=useState('')
    const nav=useNavigate();

    async function handleaddcourse(){
        const token='Bearer '+localStorage.getItem("token")
        const user=localStorage.getItem("user")
        if(user && token){
        // const response = await fetch(ec2+'/admin/courses', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json',"Authorization":token,"user":user },
        //     body: JSON.stringify({
        //         title:title,
        //         description:description,
        //         price:price,
        //         imageLink:imageLink,
        //         published:published
        //     })
        // });
        // const data = await response.json();
        // if (data) {

        await axios.post(ec2+"/admin/courses",{
            title:title,
            description:description,
            price:price,
            imageLink:imageLink,
            published:published
        },{
            headers:{
                'Content-Type': 'application/json',"Authorization":token,"user":user
            }
        });
        alert("Added course")
        nav('/mycourses')
}
}
    
    return(
    <div style={{display:"flex",justifyContent:"center"}}>
        <Card elevation={10} style={{width:"50%",height:"80%", padding:"2%",margin:"10%"}}>
            <TextField
                style={{margin: "1%"}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />
            <TextField
                style={{margin: "1%"}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />
            <TextField
                style={{margin: "1%"}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="setPrice"
                variant="outlined"
            />
            <TextField
                style={{margin: "1%"}}
                onChange={(e) => {
                    setImageLink(e.target.value)
                }}
                fullWidth={true}
                label="setImageLink"
                variant="outlined"
            />
            <TextField
                style={{margin: "1%"}}
                onChange={(e) => {
                    setPublished((e.target.value))
                }}
                fullWidth={true}
                label="setPublished"
                variant="outlined"
            />

            <Button variant="contained" onClick={async ()=>{
                 await handleaddcourse()
            }}>Add Course</Button>
        </Card>
    </div>
    
    )
}




// title,description,price,imageLink,published