import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { login } from "../../api/admin/adminApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdminToken } from "../../redux/adminReducer";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function AdminLogin() {
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
 
      const response = await login("/auth/admin/login", values);
      dispatch(setAdminToken(response.token));
      localStorage.setItem("adminToken",response.token);
      navigate("/admin/dashboard");
    },
  });

  return (
    <Card
      color="transparent"
      className="flex flex-col items-center justify-center pt-16 w-100"
      shadow={false}
    >
      <Typography variant="h4" color="blue-gray">
        Admin Login In
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
  position: relative;
`;
