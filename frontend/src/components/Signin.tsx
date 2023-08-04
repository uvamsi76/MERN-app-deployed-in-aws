import {Card,TextField,Button} from "@mui/material"

export function Signin(){
    return(
        <div style={{paddingBottom:"44%"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexWrap:"wrap",paddingTop:"10%"}}>
                <h1 style={{padding:10 ,width:200}}>Signin page</h1>
                <Card elevation={24} style={{display:"flex",flexDirection:"column",alignItems:"center",paddingTop:30 ,height:"200%",width:"20%",justifyContent:"center"}}>
                <TextField style={{margin:20}} id="outlined-basic" label="username" variant="outlined" />
                <TextField style={{margin:20}} id="outlined-basic" label="password" variant="outlined" />
                <Button variant="contained" style={{margin:20}}> signin</Button>
                </Card>
            </div>
        </div>
    )
}