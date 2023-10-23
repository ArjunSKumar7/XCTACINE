  import "./App.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useState } from "react";
  // import {useNavigate} from 'react-router-dom';
  //*********************************User Pages***********************************************/
  import UserHome from "../src/pages/user/UserHome";
  import { LoginForm } from "./pages/user/UserLogin";
  import Signup from "./pages/user/UserSignup";
  import UserSeatBooking from "./pages/user/UserSeatBooking";
  import UserBookNowMovie from "./pages/user/UserBookNowMovie";
  import UserProfilePage from "./pages/user/UserProfilePage";
  import GuestHome from "./pages/user/GuestHome";

  //*******************************Theatre Pages*******************************/
  import TheatreDashBoard from "../src/pages/theatre/TheatreDashBoard";
  import { TheatreLogin } from "../src/pages/theatre/TheatreLogin";
  import TheatreSignup from "../src/pages/theatre/TheatreSignUp";
  import TheatreMovieDetails from "./pages/theatre/TheatreMovieDetails";
  import TheatreScreenDetails from "./pages/theatre/TheatreScreenDetails";
  import TheatreShowMangement from "./pages/theatre/TheatreShowMangement";

  //*********************Admin Pages*********************/
  import { AdminLogin } from "./pages/admin/AdminLogin";
  import AdminDashboard from "./pages/admin/AdminDashboard";
  import AdminUserDetails from "./pages/admin/AdminUserDetails";
  import AdminTheatreDetails from "./pages/admin/AdminTheatreDetails";
  import AdminAddLocation from "./pages/admin/AdminAddLocation";
  import UserPaymentPage from "./pages/user/UserPaymentPage"
  import UserPaymentSuccess from "./pages/user/UserPaymentSuccess";

  function App() {

    const uniqueId = useSelector((store) => store.user?.uniqueId);
    const userToken = useSelector((state) => state.user.userToken);
    console.log("userToken", userToken);
    const theatreToken = useSelector((state) => state.theatre.theatreToken);

    const adminToken = useSelector((state) => state.admin.adminToken);
    const theatredata = useSelector((state) => state.theatre.theatreDetails);
    console.log("theatredata", theatredata);

    console.log("theatredataxxx", theatredata);
    

    return (
      <>
        <ToastContainer />
        <Router>
          {/*********************************************User Routes*****************************************************/}
          <Routes>
            <Route path="/login"  element={userToken ? <UserHome /> : <LoginForm />} />
          </Routes>

          <Routes>
            <Route path="/"  element={userToken ? <UserHome /> : <GuestHome />} />
          </Routes>
          <Routes>
            <Route path="/home"  element={userToken ? <UserHome /> : <LoginForm />} />
          </Routes>

          <Routes>
            <Route path="/signup" element={userToken ? <UserHome /> : <Signup />} />
          </Routes>

          <Routes>
            <Route
              path="/seatbooking"
              element={userToken ? <UserSeatBooking /> : <LoginForm />}
            />
          </Routes>

          <Routes>
            <Route
              path="/movietobook"
              element={userToken ? <UserBookNowMovie /> : <LoginForm />}
            />
          </Routes>

          <Routes>
            <Route
              path="/profile"
              element={userToken ? <UserProfilePage /> : <LoginForm />}
            />
          </Routes>

          <Routes>
            <Route
              path="/payment"
              element={userToken ? <UserPaymentPage /> : <LoginForm />}
            />
          </Routes>

          <Routes>
            <Route
              path={`/stripe/payment/success/${uniqueId}`}
              element={userToken ? <UserPaymentSuccess /> : <LoginForm />}
            />
          </Routes>

          {/*********************************************User Routes**********************************************************/}

          {/*********************************************Theatre Routes*******************************************************/}
          <Routes>
            <Route
              path="/theatre/login"
              element={theatreToken ? <TheatreDashBoard data={theatredata} />: <TheatreLogin />}
            />
          </Routes>

          <Routes>
            <Route
              path="/theatre/dashboard"
              element={theatreToken ? <TheatreDashBoard data={theatredata} />: <TheatreLogin />}
            />
          </Routes>

          <Routes>
            <Route path="/theatre/signup" element={theatreToken ? <TheatreDashBoard data={theatredata}/> : <TheatreSignup />} />
          </Routes>

          <Routes>
            <Route
              path="/theatre/movielist"
              element={theatreToken ? <TheatreMovieDetails /> : <TheatreLogin />}
            />
          </Routes>

          <Routes>
            {" "}
            <Route
              path="/theatre/screenlist"
              element={theatreToken ? <TheatreScreenDetails /> : <TheatreLogin/>}
            />
          </Routes>

          <Routes>
            <Route
              path="/theatre/showmanagement"
              element={theatreToken ? <TheatreShowMangement /> : <TheatreLogin />}
            />
          </Routes>
          {/*********************************************Theatre Routes*******************************************************/}

          {/*********************************************Admin Routes*********************************************************/}
          
          <Routes>
            <Route path="/admin/login" element={adminToken ? <AdminDashboard />: <AdminLogin />} />
          </Routes>


          <Routes>
            <Route
              path="/admin/dashboard"
              element={adminToken ? <AdminDashboard /> : <AdminLogin />}
            />
          </Routes>
          <Routes>
            <Route
              path="/admin/userlist"
              element={adminToken ? <AdminUserDetails /> : <AdminLogin />}
            />
          </Routes>

          <Routes>
            <Route
              path="/admin/theatrelist"
              element={adminToken ? <AdminTheatreDetails /> : <AdminLogin />}
            />
          </Routes>

          <Routes>
            <Route
              path="/admin/addlocation"
              element={adminToken ? <AdminAddLocation /> : <AdminLogin />}
            />
          </Routes>

          {/*********************************************Admin Routes*********************************************************/}
        </Router>
      </>
    );
  }

  export default App;
