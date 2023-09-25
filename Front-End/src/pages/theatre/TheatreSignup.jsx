import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setTheatreToken,
  setTheatreDetails,
  setLocationList,
} from "../../redux/theatreReducer";

import { signup, fetchLocation } from "../../api/theater/theaterApi";
import styled from "styled-components";
import * as Yup from "yup";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const TheatreSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LocationData, setLocationData] = useState([]);
  // const [selectLocation, setSelectLocation] = useState("");
  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .max(15, "Must be 20 characters or less")
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
  });
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Location: "",
      Password: "",
      rePassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      formik.setField;
      console.log("theatre values", values);
      const response = await signup("/auth/theatre/signup", values);
      console.log("theatre response", response);
      const theatreDetails = {
        theatreName: response?.theatre?.Name,
        theatreId: response?.theatre?._id,
        theatreApprovalStatus: response?.theatre?.approvalStatus,
        theatreLocation: response?.theatre?.Location,
      };
      dispatch(setTheatreDetails(theatreDetails));
      dispatch(setTheatreToken(response?.token));
      localStorage.setItem("theatreDetails", JSON.stringify(theatreDetails));
      localStorage.setItem("theatreToken", response?.token);
      navigate("/theatre/login");
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetchLocation();
      console.log("theatre response", response);
      return response;
    }

    fetchData().then((data) => {
      console.log("data", data?.locationList);
      dispatch(setLocationList(data?.locationList));
      setLocationData(data?.locationList);
    });
  }, []);

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
            <Select
              label="Select Location"
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {LocationData?.map((location, index) => (
                <Option
                  key={index}
                  name="Location"
                  value={location}
                  onClick={() => {
                    formik.setFieldValue("Location", location);
                  }}
                >
                  {location}
                </Option>
              ))}
            </Select>

            {/* <Select
  label="Select Location"
  name="Location"
  value={location} // Access the field value from values.Location
  onChange={formik.handleChange} // Handle change
  onBlur={formik.handleBlur} // Handle blur
  animate={{
    mount: { y: 0 },
    unmount: { y: 25 },
  }}
>
  {LocationData?.map((location, index) => (
    <Option key={index} value={location}>
      {location}
    </Option>
  ))}
</Select> */}
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
            href="/theatre/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
};

export default TheatreSignup;

const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
`;
