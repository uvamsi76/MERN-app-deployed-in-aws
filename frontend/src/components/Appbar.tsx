import React from "react";
import {Button ,Switch ,Typography,Box,Tooltip,IconButton,Avatar,Menu,MenuItem} from "@mui/material"
import { useNavigate } from "react-router-dom";
import {isSpecialState} from "../store/isSpecial"
import {useRecoilState} from "recoil"
import {useState,useEffect} from "react"
export function Appbar(){
    const companyname="Ecommerse"
    const settings:string[] = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [isSpecial,setIsSpecial]=useRecoilState(isSpecialState);

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [username,setUsername]=useState("")
    const [bcl,setBcl]=useState("#f5f5f5")
    const [tcl,setTcl]=useState("#17171F")
    const navigate = useNavigate();
    function redirect(setting:string) {
        if(setting=="Profile"){
            navigate('/profile')
        }
        else if(setting=="Account"){
            navigate("/account")
        }
        else if(setting=="Dashboard"){
            navigate("/dashboard")
        }
        else if(setting=="Logout"){
            navigate("logout")
        }
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    useEffect(()=>{
        if (isSpecial) {
          setBcl("#17171F")
          setTcl("#f5f5f5")
        }
        else{
          setTcl("#17171F")
          setBcl("#f5f5f5")
        }
        const un=localStorage.getItem("username")
      if(un){
      setUsername(un)
      console.log("triggered")
      console.log(isSpecial)
      }},[isSpecial])
    
    if(username){
        return (
            <div style={{display:"flex",justifyContent:"space-between", backgroundColor:bcl,margin:0,padding:0}}>
                <div>
                    <img style={{ width: 60, height: 45 }} src="https://wallpapercave.com/wp/wp7771193.jpg"
                        alt="image here" />
                </div>
                <div>
                    <Typography style={{color:tcl,fontSize:"200%"}}>{companyname}</Typography>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <div>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp"
                                        src="https://images.unsplash.com/photo-1516729557409-298ab938f00c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw=&w=1000&q=80" />
                                </IconButton>
                            </Tooltip>
                            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{
                vertical:'top',
                horizontal: 'right',
              }} keepMounted transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                {settings.map((setting) => (
                                <MenuItem key={setting} onClick={()=>{redirect(setting)}}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                    </div>
                    <div>

                    </div>
                    <div style={{display:"flex"}}>
                        <Switch onChange={()=>{
                            setIsSpecial(!isSpecial)
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                    </div>
                </div>
            </div>)

            }else{
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
}