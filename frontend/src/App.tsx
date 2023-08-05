import './App.css'
import {Home} from "./components/Home";
import {Appbar} from "./components/Appbar"
import {Signin} from "./components/Signin"
import {Signup} from "./components/Signup"
import {Logout} from "./components/Logout"
import { isSpecialState } from './store/isSpecial';
import {useRecoilState} from "recoil"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  // const [text, setText] = useRecoilState(textState);
const [isSpecial]=useRecoilState(isSpecialState);
  return(
  <div className={isSpecial ? 'special-style' : 'default-style'}>
    <Router>
      <Appbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
    
    </div>
    )
}

export default App
