import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import {useNavigate} from 'react-router-dom';
import Home from "../src/pages/user/home";
import {TheatreHome} from "../src/pages/theatre/theatre_Home";

import "./App.css";
import {TheatreLogin} from "../src/pages/theatre/theatre_Login"
import TheatreSignup from "../src/pages/theatre/theatre_SignUp"
import { LoginForm } from "./pages/user/userLogin";
import {AdminLogin} from "./pages/admin/admin_Login";
import Signup from "./pages/user/user_Signup";


function App() {
  
  const userToken = useSelector((state) => state.user.userToken);
  const theatreToken = useSelector((state) => state.theatre.theatreToken);
  console.log("app.js theatretoken",theatreToken)
  // const adminToken = useSelector((state) => state.admin.adminToken);

  return (
    <Router>
      <Routes>
        <Route path="/" element={userToken ? <Home /> : <LoginForm />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Routes>
        <Route path="/theatre/login" element={theatreToken ? <TheatreHome /> :<TheatreLogin/>} />
      </Routes>
      <Routes>
        <Route path="/theatre/signup" element={<TheatreSignup/>} />
      </Routes>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin/>} />
      </Routes>
    
    </Router>
  );
}

export default App;
