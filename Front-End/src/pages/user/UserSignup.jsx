import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/userReducer";
import { useState } from "react";
import {signup} from "../../api/user/userApi";
import styled from "styled-components";
import {app} from "../../firebase/googleAuth/config"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import * as Yup from "yup";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
const auth = getAuth(app);
const Signup = () => {
const dispatch = useDispatch();
const navigate=useNavigate()
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(!open);

  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .max(10, "Must be 20 characters or less")
      .required("Required"),
    Email: Yup.string().email("Invalid email").required("Required"),
    Password: Yup.string()
      .min(1, "Must be 8 characters or more")
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
      
    rePassword: Yup.string()
      .oneOf([Yup.ref("Password"), ""], "Password not match")
      .required("Required"),

      Mobile: Yup.string()
      .matches(/^[0-9]{10}$/,'Mobile number must be a 10-digit numeric value')
      .required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      rePassword: "",
      Mobile:"",
    },
    validationSchema: SignupSchema,
    onSubmit:async(values) => {
      const response=await signup("/auth/user/signup", values)
      localStorage.setItem("userToken", response.token);
      dispatch(setToken(response.token))
      
      navigate("/")

    },
  });



  const onCaptchaVerify=()=>{
   
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
  }

  const onSignupSubmit=()=>{
    const phoneNumber = `+91${formik?.values?.Mobile}`;
const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

return (
    <Card color="transparent" className="flex flex-col items-center justify-center pt-16 w-100" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
        <div className="position-relative">
  <Input
    size="lg"
    name="Name"
    label="Name"
    {...formik.getFieldProps('Name')}
  />
  {formik.touched.Name && formik.errors.Name && (
    <Error>{formik.errors.Name}</Error>
  )}
</div>

          <div className="position-relative">
            <Input
              size="lg"
              name="Email"
              label="Email"
              {...formik.getFieldProps('Email')}
            />
            {formik.errors.Email && formik.touched.Email && (
              <Error>{formik.errors.Email}</Error>
            )}
          </div>
          <div className="position-relative">
            <Input
              type="password"
              name="Password"
              size="lg"
              label="Password"
              {...formik.getFieldProps('Password')}
            />
            {formik.errors.Password && formik.touched.Password && (
              <Error>{formik.errors.Password}</Error>
            )}
          </div>
          <div className="position-relative">
            <Input
              type="password"
              name="rePassword"
              size="lg"
              label="Re-Password"
              {...formik.getFieldProps('rePassword')}
            />
            {formik.errors.rePassword && formik.touched.rePassword && (
              <Error>{formik.errors.rePassword}</Error>
            )}
          </div>

          <div className="position-relative">
            <Input
              type="text"
              name="Mobile"
              size="lg"
           
              label="Mobile-Number"
              {...formik.getFieldProps('Mobile')}
            />
            {formik.errors.Mobile && formik.touched.Mobile && (
              <Error>{formik.errors.Mobile}</Error>
            )}
          </div>

        </div>









        <Button onClick={handleOpen} className="p-2 rounded-full w-28 ml-auto mr-auto capitalize"  variant="outlined" >Send OTP</Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody className="flex flex-col items-center justify-center p-1">
                  <h1 className="text-lg text-black font-bold mb-1">OTP Sent</h1>
                  <div>
                    <Input type="text" className="" value={"otp"} onChange={"otpHandler"} label="Enter otp"/>
                  </div>
                  <p className="text-red-900 text-xs h-4">{"aa"}</p>
                  <Button className=" m-2 capitalize" size='sm' variant="gradient" color="green" >
                    Verify
                  </Button>
                </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>



<div id="recaptcha-container">

</div>













        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button type="submit" className="mt-6" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="/"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    


    </Card>
  );
};

export default Signup;

const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
`;
