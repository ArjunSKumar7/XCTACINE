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

export function SimpleRegistrationForm() {
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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (

    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
      </Typography>
      <form  onSubmit={formik.handleSubmit} className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
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
        <Button className="mt-6" fullWidth>
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
}


const Error = styled.span`
  font-size: 12px;
  color: red;
  position: absolute;
  left: 0;
`;