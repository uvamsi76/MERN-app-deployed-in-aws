import { type } from "os"
import {RecoilState, atom ,selector} from "recoil"

export type Coursetype ={
    title: string,
      description: string,
      price: Number,
      imageLink: string,
      published: Boolean,
      Author: string,
      _id:string
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
export const courseState=atom<Coursetype|null>({
    key:"courseState",
    default:null
})

// const courseTitleState = selector<Str>({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     get: ({get}) => {
//       const text = get(courseTitleState);
  
//       return text.length;
//     },
//   });