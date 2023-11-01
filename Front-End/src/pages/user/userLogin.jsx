import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { login, googleLogIn } from "../../api/user/userApi";
import { setToken } from "../../redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/googleAuth/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGLogin = async () => {
    signInWithPopup(auth, googleProvider).then(async (data) => {
      const gData = { Name: data.user.displayName, Email: data.user.email };
      const response = await googleLogIn(gData);
      if(response?.status===200){
        toast.success(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const userData = {
          userToken: response.token,
          userId: response.user._id,
        };
        localStorage.setItem("userToken", userData.userToken);
        dispatch(setToken(userData));
        navigate("/home");
      }else{
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    
        
      
    });
  };

  const SignupSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string()
      .min(1, "Must be 8 characters or more")
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      const response = await login("/auth/user/login", values);
      if (response?.status == 400) {
        toast.error(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const userData = {
          userToken: response.token,
          userId: response.user._id,
        };
        dispatch(setToken(userData));
        localStorage.setItem("userToken", response.token);

        navigate("/");
        toast.success(`${response?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  // flex flex-col items-center justify-center pt-16 w-100
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Make the container at least the height of the viewport
      }}
    >
      <Card className="  ">
        {/* <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Log In
        </Typography>
      </CardHeader> */}
        <CardHeader
          variant="gradient"
          className="mb-0 grid h-28 place-items-center bg-black"
        >
          <img
            src="https://res.cloudinary.com/dbsgcwkhd/image/upload/v1694432315/android-chrome-512x512_kj47v1.png"
            alt="Cloudinary Image"
            className="h-28 w-44" // You can adjust the width and height as needed
          />
        </CardHeader>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <CardBody className="flex flex-col gap-4">
            <Input
              size="lg"
              name="Email"
              label="Email"
              {...formik.getFieldProps("Email")}
            />
            {formik.errors.Email && formik.touched.Email && (
              <Error>{formik.errors.Email}</Error>
            )}

            <Input
              type="password"
              name="Password"
              size="lg"
              label="Password"
              {...formik.getFieldProps("Password")}
            />
            {formik.errors.Password && formik.touched.Password && (
              <Error>{formik.errors.Password}</Error>
            )}

            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              color="blue-gray"
              type="submit"
              variant="gradient"
              fullWidth
            >
              <span className="text-black">Log In</span>
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?{" "}
              <Typography
                as="a"
                href="/signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
        <div className="flex justify-center mb-4 ">
          <Button
            onClick={handleGLogin}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className=" mb-4 place-items-center justify-center flex gap-1"
          >
            <img
              src="https://img.icons8.com/office/40/google-logo.png"
              alt="googleicon"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}
const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
  top: -10px;
  height: 0;
`;
