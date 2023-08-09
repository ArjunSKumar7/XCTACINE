import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import {useNavigate} from 'react-router-dom';
import Home from "../src/pages/user/home";

import "./App.css";

import { LoginForm } from "./pages/user/userLogin";
import Signup from "./pages/user/user_Signup";


function App() {
  // const navigate =useNavigate()
  const reduxToken = useSelector((state) => state.user.userToken);
  // localStorage.removeItem("token");
  // console.log(reduxToken,reduxToken.length)
  // if(reduxToken){
  //   navigate("/")
  // }
  return (
    <Router>
      <Routes>
        <Route path="/" element={reduxToken ? <Home /> : <LoginForm />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/theatre/login" element={<Signup />} />
      </Routes>
    
    </Router>
  );
}

export default App;
