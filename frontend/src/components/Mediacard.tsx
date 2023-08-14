import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {Coursetype} from "../store/course"
// import {useState} from "react"

// MyComponentProps.ts
export type MyComponentProps = {
  course:Coursetype
}
// type Course ={
//   title: string,
//     description: string,
//     price: Number,
//     imageLink: string,
//     published: Boolean,
//     Author: string,
//     _id:string
// }


const Mediacard: React.FC<MyComponentProps> =({course})=>{
  const nav=useNavigate()
  // const ilink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=";
  const ilink=course.imageLink;
  const tle=course.title
  // const desc="suii"
  return (
    <Card elevation={2} sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={ilink}
        title={tle}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {tle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={()=>nav(`/course/${course._id}`)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Mediacard;