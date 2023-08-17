import {useNavigate} from "react-router-dom"
import {tokenState} from "../store/token"
import {useRecoilState} from "recoil"
import { Button } from "@mui/material"


export function Logout(){
const nav=useNavigate()
try{
    const [tokenn,setTokenn]=useRecoilState(tokenState)
    localStorage.clear();
    setTokenn("")
    console.log(tokenn)
    window.location.href='/'
}
catch(err){
    console.log(err)
    nav('/')
}
    return (
        <div style={{display:"flex" , justifyContent:"center"}}>
            <Button onClick={()=>{
                window.location.href='/'
            }}>get back to main page</Button>
        </div>
    )
}