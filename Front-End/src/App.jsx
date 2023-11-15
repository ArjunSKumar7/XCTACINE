import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//*********************************User Pages***********************************************/
import UserHome from "../src/pages/user/UserHome";
import { LoginForm } from "./pages/user/UserLogin";
import Signup from "./pages/user/UserSignup";
import UserSeatBooking from "./pages/user/UserSeatBooking";
import UserBookNowMovie from "./pages/user/UserBookNowMovie";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserPaymentPage from "./pages/user/UserPaymentPage";
import UserPaymentSuccess from "./pages/user/UserPaymentSuccess";
import UserPaymentFailed from "./pages/user/UserPaymentFailed";
import GuestHome from "./pages/user/GuestHome";

//*******************************Theatre Pages*******************************/
import TheatreDashBoard from "../src/pages/theatre/TheatreDashBoard";
import { TheatreLogin } from "../src/pages/theatre/TheatreLogin";
import TheatreSignup from "../src/pages/theatre/TheatreSignUp";
import TheatreMovieDetails from "./pages/theatre/TheatreMovieDetails";
import TheatreScreenDetails from "./pages/theatre/TheatreScreenDetails";
import TheatreShowMangement from "./pages/theatre/TheatreShowMangement";
import TheatreBookingDetails from "./pages/theatre/TheatreBookingDetails";

//*********************Admin Pages*********************/
import { AdminLogin } from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserDetails from "./pages/admin/AdminUserDetails";
import AdminTheatreDetails from "./pages/admin/AdminTheatreDetails";
import AdminAddLocation from "./pages/admin/AdminAddLocation";
import AdminBannerDetails from "./pages/admin/AdminBannerDetails";

//*********************Error Pages*********************/
import SomethingWentWrong from "./pages/errorPages/SomethingWentWrong";
import PageNotFound404 from "./pages/errorPages/PageNotFound404";
import UnAuthorized from "./pages/errorPages/UnAuthorized";


function App() {
  const uniqueId = useSelector((store) => store.user?.uniqueId);
  const userToken = useSelector((state) => state.user.userToken);
  const theatreToken = useSelector((state) => state.theatre.theatreToken);

  const adminToken = useSelector((state) => state.admin.adminToken);
  const theatredata = useSelector((state) => state.theatre.theatreDetails);

  return (
    <>
      <ToastContainer />
      <Router>
        {/*********************************************User Routes*****************************************************/}
        <Routes>
          <Route
            path="/login"
            element={userToken ? <UserHome /> : <LoginForm />}
          />
          <Route path="/" element={userToken ? <UserHome /> : <GuestHome />} />
          <Route
            path="/home"
            element={userToken ? <UserHome /> : <LoginForm />}
          />
          <Route
            path="/signup"
            element={userToken ? <UserHome /> : <Signup />}
          />
          <Route
            path="/seatbooking"
            element={userToken ? <UserSeatBooking /> : <LoginForm />}
          />
          <Route
            path="/movietobook"
            element={userToken ? <UserBookNowMovie /> : <LoginForm />}
          />
          <Route
            path="/profile"
            element={userToken ? <UserProfilePage /> : <LoginForm />}
          />
          <Route
            path="/payment"
            element={userToken ? <UserPaymentPage /> : <LoginForm />}
          />
          <Route
            path={`/stripe/payment/success/${uniqueId}`}
            element={userToken ? <UserPaymentSuccess /> : <LoginForm />}
          />
          <Route
            path={`/stripe/payment/cancel/${uniqueId}`}
            element={userToken ? <UserPaymentFailed /> : <LoginForm />}
          />
          {/*********************************************User Routes**********************************************************/}
          {/*********************************************Theatre Routes*******************************************************/}
          <Route
            path="/theatre/login"
            element={
              theatreToken ? (
                <TheatreDashBoard data={theatredata} />
              ) : (
                <TheatreLogin />
              )
            }
          />
          <Route
            path="/theatre/dashboard"
            element={
              theatreToken ? (
                <TheatreDashBoard data={theatredata} />
              ) : (
                <TheatreLogin />
              )
            }
          />
          <Route
            path="/theatre/signup"
            element={
              theatreToken ? (
                <TheatreDashBoard data={theatredata} />
              ) : (
                <TheatreSignup />
              )
            }
          />
          <Route
            path="/theatre/movielist"
            element={theatreToken ? <TheatreMovieDetails /> : <TheatreLogin />}
          />{" "}
          <Route
            path="/theatre/screenlist"
            element={theatreToken ? <TheatreScreenDetails /> : <TheatreLogin />}
          />
          <Route
            path="/theatre/showmanagement"
            element={theatreToken ? <TheatreShowMangement /> : <TheatreLogin />}
          />
          <Route
            path="/theatre/bookinglist"
            element={
              theatreToken ? <TheatreBookingDetails /> : <TheatreLogin />
            }
          />
          {/*********************************************Theatre Routes*******************************************************/}
          {/*********************************************Admin Routes*********************************************************/}
          <Route
            path="/admin/login"
            element={adminToken ? <AdminDashboard /> : <AdminLogin />}
          />
          <Route
            path="/admin/dashboard"
            element={adminToken ? <AdminDashboard /> : <AdminLogin />}
          />
          <Route
            path="/admin/userlist"
            element={adminToken ? <AdminUserDetails /> : <AdminLogin />}
          />
          <Route
            path="/admin/theatrelist"
            element={adminToken ? <AdminTheatreDetails /> : <AdminLogin />}
          />
          <Route
            path="/admin/bannerlist"
            element={adminToken ? <AdminBannerDetails /> : <AdminLogin />}
          />
          <Route
            path="/admin/addlocation"
            element={adminToken ? <AdminAddLocation /> : <AdminLogin />}
          />
          {/*********************************************Admin Routes*********************************************************/}

          {/*********************************************Error Routes*********************************************************/}
          <Route
          path="/404"
          element={
            <PageNotFound404/>
          }
          />

          <Route
          path="/401"
          element={
            <UnAuthorized/>
          }
          />

<Route
          path="/500"
          element={
            <SomethingWentWrong/>
          }
          />

          {/*********************************************Error Routes*********************************************************/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
