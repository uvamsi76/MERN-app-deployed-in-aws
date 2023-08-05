import {useNavigate} from "react-router-dom"
import {tokenState} from "../store/token"
import {useRecoilState} from "recoil"


export function Logout(){
const nav=useNavigate()
try{
    const [tokenn,setTokenn]=useRecoilState(tokenState)
    localStorage.clear();
    setTokenn("")
    console.log(tokenn)
    nav('/')
}
catch(err){
    console.log(err)
    nav('/')
}
    return 
}