import {Card,TextField,Button} from "@mui/material"
import {useState} from "react"
import {tokenState} from "../../store/token"
import {useRecoilState} from "recoil"
import { ec2 } from "../../assets/var"
import { useNavigate } from "react-router-dom"
import { isAdminState } from "../../store/course"
export function AdminSignin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [tokenn,setTokenn]=useRecoilState(tokenState)
    const [isadmin,Setisadmin] =useRecoilState(isAdminState)
    const nav=useNavigate()
    const handleSignin = async () => {
        console.log(tokenn,isadmin)
        const response = await fetch(ec2+'/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.clear();
             setTokenn(data.token)
             Setisadmin(true)
            localStorage.setItem("token", data.token)
            localStorage.setItem("isadmin","true")
            localStorage.setItem("user", data.username)
            window.location.href = "/";
        } else {
            alert("Error while signing up");
        }
    };
    return(
        <div style={{paddingBottom:"44%"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",paddingTop:"10%"}}>
                <h1 style={{padding:10 ,width:300}}>Admin Signin page</h1>
                <Card elevation={24} style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:30 ,height:"200%",width:"20%",justifyContent:"center"}}>
                    <TextField style={{margin:20}} id="outlined-basic" label="username" variant="outlined" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <TextField style={{margin:20}} id="outlined-basic" label="password" variant="outlined" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <Button variant="contained" style={{margin:20}} onClick={handleSignin}>  signin</Button>
                        <Button size="small"> forgot password ?</Button>
                    </div>
                    <Button size="small" style={{marginBottom:"5%"}} onClick={()=>{nav('/signin_user')}}> switch to user signin </Button>    
                </Card>
            </div>
        </div>
    )
}