import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { login } from "../../api/theater/theaterApi";
import { setTheatreToken, setTheatreDetails } from "../../redux/theatreReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function TheatreLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await login("/auth/theatre/login", values);
      if (response?.status === 200) {
        const theatreDetails = {
          theatreName: response?.theatre?.Name,
          theatreId: response?.theatre?._id,
          theatreApprovalStatus: response?.theatre?.approvalStatus,
          theatreLocation: response?.theatre?.Location,
        };
        dispatch(setTheatreDetails(theatreDetails));
        dispatch(setTheatreToken(response?.token));
        localStorage.setItem("theatreToken", response?.token);
        localStorage.setItem("theatreDetails", JSON.stringify(theatreDetails));

        navigate("/theatre/dashboard");
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
    },
  });

  return (
    <Card
      className="flex flex-col items-center justify-center pt-16 w-100"
      color="transparent"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Theatre Log In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
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
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Not have an account?{" "}
          <a
            href="/theatre/signup"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign Up
          </a>
        </Typography>
      </form>
    </Card>
  );
}

const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
`;
