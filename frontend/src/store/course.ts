import { type } from "os"
import {RecoilState, atom ,selector} from "recoil"

export type Coursetype ={
    title: string|null,
      description: string,
      price: Number,
      imageLink: string,
      published: Boolean,
      Author: string,
      _id:string
  } 
export const courseState=atom<Coursetype>({
    key:"courseState"
})

// const courseTitleState = selector<Str>({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     get: ({get}) => {
//       const text = get(courseTitleState);
  
//       return text.length;
//     },
//   });