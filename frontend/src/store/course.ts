import { atom } from "recoil"

export type Coursetype ={
    title: string,
      description: string,
      price: Number,
      imageLink: string,
      published: Boolean,
      Author: string,
      _id:string
  } 
export const courseState=atom<Coursetype|null>({
    key:"courseState",
    default:null
})

export const isAdminState=atom<Boolean>({
  key:"isAdminState",
  default:false
})

export const publishedcourseState=atom<any[]>({
  key:"publishedcourseState",
  default:[]
})

export const purchasedcourseState=atom<Coursetype|null>({
  key:"purchasedcourseState",
  default:null
})

  // type Course ={
//   title: string,
//     description: string,
//     price: Number,
//     imageLink: string,
//     published: Boolean,
//     Author: string,
//     _id:string
// }

// const courseTitleState = selector<Str>({
//     key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//     get: ({get}) => {
//       const text = get(courseTitleState);
  
//       return text.length;
//     },
//   });