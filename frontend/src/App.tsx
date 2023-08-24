import './App.css'
import {Home} from "./components/Home";
import {Appbar} from "./components/Appbar"
import {AdminSignin} from "./components/admin/Signin_admin"
import {AdminSignup} from "./components/admin/Signup_admin"
import {UserSignin} from "./components/users/Signin_users"
import {UserSignup} from "./components/users/Signup_users"
import {Logout} from "./components/Logout"
import { isSpecialState } from './store/isSpecial';
import {useRecoilState} from "recoil"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Course } from './components/Course';
import { Publishedcourses } from './components/admin/Publishedcourses';
import { Updatecourses } from './components/admin/Updatecourses';
import { Purchasedcourses } from './components/users/Purchasedcourses';
import { Addcourse } from './components/admin/Addcourse';
import { Deletecourse } from './components/admin/Deletecourse';
function App() {
  // const [text, setText] = useRecoilState(textState);
const [isSpecial]=useRecoilState(isSpecialState);
  return(
  <div className={isSpecial ? 'special-style' : 'default-style'}>
    <Router>
      <Appbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin_admin" element={<AdminSignin/>}/>
        <Route path="/signup_admin" element={<AdminSignup/>}/>
        <Route path="/signin_user" element={<UserSignin/>}/>
        <Route path="/signup_user" element={<UserSignup/>}/>
        <Route path="/course/:courseid" element={<Course/>}/>
        <Route path="/dashboard" element={<Purchasedcourses/>}/>
        <Route path="/addcourse" element={<Addcourse/>}/>
        <Route path="/updatecourses/:courseid" element={<Updatecourses/>}/>
        <Route path="/deletecourse/:courseid" element={<Deletecourse/>}/>
        <Route path="/mycourses" element={<Publishedcourses/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
    
    </div>
    )
}

export default App
