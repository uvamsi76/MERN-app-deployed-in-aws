import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import {useState} from "react"

// MyComponentProps.ts
type MyComponentProps = {
  imglink: string;
  title: string;
  // Add other props with their respective types
};


const Mediacard: React.FC<MyComponentProps> =({imglink,title})=>{
  const a=imglink
  const b=title
  const ilink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=";
  const tle="liz"
  // const desc="suii"
  return (
    <Card sx={{ maxWidth: 345 }}>
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
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Mediacard;