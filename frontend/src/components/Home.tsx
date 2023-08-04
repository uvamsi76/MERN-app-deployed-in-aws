import Mediacard from "./Mediacard"
// import {isSpecialState} from "../store/isSpecial"
// import {useRecoilValue} from "recoil"
// const styles = {
//     // Default styles here
//     display:"flex",justifyContent:"center",flexWrap: "wrap"
//   };
// const isSpecial =useRecoilValue(isSpecialState); 
//   if (isSpecial) {
//     Object.assign(styles, {
//       // Special styles here
//     });
//   }

//   return (
//     <div style={styles}>
//       {/* Content */}
//     </div>
//   );
export function Home(){
    return (
    <div style={{display:"flex",justifyContent:"center",flexWrap: "wrap",padding:"8%"}}>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
        <div style={{display:"flex",justifyContent:"center",margin:20}}><Mediacard imglink="https://media.gettyimages.com/id/641180916/photo/lizard-in-a-human-hand.jpg?s=612x612&w=0&k=20&c=Thda7uz484WhqbByDODkcn11CMZhgCY46tvCGElEicU=" title="suii"/>
</div>
    </div>)
}