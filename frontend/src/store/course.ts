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
export const courseState=atom<Coursetype|null>({
    key:"courseState",
    default:null
})

export const publishedcourseState=atom<Coursetype|null>({
  key:"publishedcourseState",
  default:null
})

export const purchasedcourseState=atom<Coursetype|null>({
  key:"publishedcourseState",
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