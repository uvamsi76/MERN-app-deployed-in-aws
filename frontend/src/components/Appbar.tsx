import {Button ,Switch ,Typography} from "@mui/material"
import { useNavigate } from "react-router-dom";
import {isSpecialState} from "../store/isSpecial"
import {useRecoilState} from "recoil"
export function Appbar(){
    const companyname="Ecommerse"
    const [isSpecial,setIsSpecial]=useRecoilState(isSpecialState);
    const navigate = useNavigate();
    
    var bcl="#f5f5f5";
    var tcl="#17171F"
      if (isSpecial) {
        bcl="#17171F"
        tcl="#f5f5f5"
      }
    return (
    <div style={{display:"flex",justifyContent:"space-between", backgroundColor:bcl,margin:0,padding:0}}>
        <div>
            <img style={{ width: 60, height: 45 }} src="https://wallpapercave.com/wp/wp7771193.jpg" alt="image here" />
        </div>
        <div>
        <Typography style={{color:tcl,fontSize:"200%"}}>{companyname}</Typography>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
            <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                navigate('/signup')
            }}>Sign Up</Button>
            </div>
            <div>
            <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                navigate('/signin')
            }}>Sign In</Button>
            </div>
            <div style={{display:"flex"}}> 
            <Switch
                onChange={()=>{
                    setIsSpecial(!isSpecial)
                }}
                inputProps={{ 'aria-label': 'controlled' }}
/>
            </div>
        </div>
    </div>)
}