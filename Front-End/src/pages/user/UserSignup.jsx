import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/userReducer";
import { useEffect, useState } from "react";
import { signup } from "../../api/user/userApi";
import { toast } from "react-toastify";
import styled from "styled-components";
import { app } from "../../firebase/googleAuth/config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import * as Yup from "yup";
import { findNumber } from "../../api/user/userApi";
import {
  Card,
  Input,
  // Checkbox,
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
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sendOtpView, setSendOtpView] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [ifVerified, setIfVerified] = useState(false);
  // const [time,setTime] = useState(60)
  // const [resend,setResend] = useState(false)
  const handleOpen = () => setOpen(!open);
  // const [recaptchaInstance, setRecaptchaInstance] = useState<RecaptchaVerifier | null>(null)
  useEffect(() => {
    // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    //   'size': 'invisible',
    //   'callback': (response) => {
    //     // reCAPTCHA solved, allow signInWithPhoneNumber.
    //     onSignUpSubmit()
    //     console.log("onCaptchaVerify response",response)
    //   },
    //   'expired-callback': () => {

    //     // Response expired. Ask user to solve reCAPTCHA again.

    //     // ...
    //   }
    // });
    recaptchaRender();
  }, []);

  const mobileNumberHandle = (e) => {
    const mobileValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    formik.setFieldValue("Mobile", mobileValue);
    if (mobileValue.length === 10) {
      setSendOtpView(true);
    } else {
      setSendOtpView(false);
    }
  };

  const otpHandler = (e) => {
    const otpNumber = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setOtp(otpNumber);
  };

  const recaptchaRender = async () => {
    try {
      auth.useDeviceLanguage();
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "captchaContainer",
        {
          size: "invisible",
          callback: () => {},
        }
      );
      // setRecaptchaInstance(window.recaptchaVerifier)
    } catch (error) {
      console.log("Error in captcha", error);
    }
  };

  // const startTimer = ()=>{
  //   if (!recaptchaInstance){
  //     recaptchaRender()
  //   }
  //   const timerHandle = setInterval(()=>{
  //     setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime))

  //   },1000)
  //   setTimeout(()=>{
  //     clearInterval(timerHandle)
  //     setResend(true)
  //     recaptchaInstance?.render().then(() => {
  //       console.log("ReCAPTCHA re-rendered")
  //     })
  //   },60000)
  // }

  const onSignUpSubmit = async () => {
    // setTime(60)
    // startTimer()
    // setResend(false)
    setOtpError(false);

    // onCaptchaVerify()
    const phoneNumber = `+91${formik?.values?.Mobile}`;
    const numberValidation = await findNumber(phoneNumber);
    if (numberValidation?.message === "User already exists") {
      setOpen(false);
      toast.error(`${numberValidation?.message}`, {
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
      setOpen(true);
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
          alert("OTP sented");
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("onSignUpSubmit error", error);
        });
    }
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      window.confirmationResult
        .confirm(otp)
        .then((res) => {
          console.log("res-user :", res.user, "res :", res);
          setIfVerified(true);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        })
        .catch(() => {
          setOtpError(true);
        });
    }
  };

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
      .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit numeric value")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      rePassword: "",
      Mobile: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await signup("/auth/user/signup", values);
        if (response?.status === 200) {
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
          localStorage.setItem("userToken", response?.token);
          dispatch(setToken(response));
          navigate("/home");
          window.location.reload();
        } else {
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
      } catch (error) {
        toast.error(`${error}`, {
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

  return (
    <Card
      color="transparent"
      className="flex flex-col items-center justify-center pt-16 w-100"
      shadow={false}
    >
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
              {...formik.getFieldProps("Name")}
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
              {...formik.getFieldProps("Email")}
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
              {...formik.getFieldProps("Password")}
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
              {...formik.getFieldProps("rePassword")}
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
              value={formik.values.Mobile}
              onChange={mobileNumberHandle}
              disabled={ifVerified}
              // {...formik.getFieldProps('Mobile')}
            />
            {formik.errors.Mobile && formik.touched.Mobile && (
              <Error>{formik.errors.Mobile}</Error>
            )}
          </div>
          <div id="captchaContainer"></div>
          {sendOtpView ? (
            <Button
              onClick={onSignUpSubmit}
              className=" rounded-full w-28 ml-auto mr-auto capitalize"
              variant="outlined"
            >
              Send OTP
            </Button>
          ) : (
            <></>
          )}
        </div>

        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>OTP VERIFICATION</DialogHeader>
          <DialogBody className="flex flex-col items-center justify-center p-1">
            <h1 className="text-lg text-black font-bold mb-1">OTP Sent</h1>
            <div>
              <Input
                type="text"
                className=""
                value={otp}
                onChange={otpHandler}
                label="Enter otp"
              />
              {/* <p className="text-center h-4 mt-1 text-black">{!resend ? (`Remaining time 0:${time}`) : null}</p> */}
            </div>
            <p className="text-red-900 mt-1 text-xs h-4">
              {otpError ? "Invalid OTP" : ""}
            </p>

            <Button
              className="w-28 m-2 capitalize"
              size="sm"
              variant="gradient"
              color="green"
              onClick={verifyOtp}
            >
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

        {/* <div id="recaptcha-container"></div> */}

        {/* <Checkbox
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
        /> */}
        {ifVerified ? (
          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
        ) : (
          <p className="text-center font-normal  ">
            Verify your number to register
          </p>
        )}
      </form>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{" "}
        <a
          href="/"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Sign In
        </a>
      </Typography>
    </Card>
  );
};

export default Signup;

const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
`;
