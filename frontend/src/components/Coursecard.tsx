import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {Coursetype,isAdminState} from "../store/course"
// import {useState} from "react"

export type MyComponentProps = {
  course:Coursetype,
  ispage :boolean
}

export const Coursecard =({course,ispage})=>{

  const nav=useNavigate();

  const isadmin = Boolean(localStorage.getItem("isadmin"))
  console.log(isAdminState)
  
  const ilink=course.imageLink;
  const tle=course.title
  const id=course._id
  
  var updateButton = <div></div>;
  var deleteButton=<div></div>
  
  if (isadmin && ispage) {
      deleteButton=<DeleteButton id={id}/>
      updateButton = <UpdateButton cid={id}/>;
  }
  return (
    <Card elevation={4} sx={{ maxWidth: 400 }} style={{padding:10,width:400,backgroundColor:"f4f4fc"}}>
      <CardMedia sx={{ height: 300 }} image={ilink} title={tle} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions style={{display:"flex",justifyContent:"space-between"}}>
        <Button variant='outlined' onClick={()=>nav(`/course/${course._id}`)}>view course</Button>
        {updateButton}
        {deleteButton}
      </CardActions>
    </Card>
  );
}

function UpdateButton({cid}){
  const nav=useNavigate();
  return (
    <div>
      <Button variant='outlined' onClick={()=>{nav(`/updatecourses/${cid}`)}}>Update</Button>
    </div>
  )
}
function DeleteButton({id}){
  const nav=useNavigate();
  return (
    <div>
      <Button variant='outlined' onClick={()=>{nav(`/deletecourse/${id}`)}}>Delete</Button>
    </div>
  )
}
export default Coursecard;