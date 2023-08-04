import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Signup = () => {
  const SignupSchema = Yup.object().shape({
    Name: Yup.string()
      .max(1, "Must be 20 characters or less")
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
      Password: "",
      rePassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Theater Sign Up
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
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.Name}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Password}
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
              label="re-Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.rePassword}
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
            href="#"
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
  position: absolute;
  left: 0;
`;
