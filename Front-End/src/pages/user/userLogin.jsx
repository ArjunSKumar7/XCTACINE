import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { login } from "../../api/user/userApi";
import { setToken } from "../../redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      dispatch(setToken(response.token));
     localStorage.setItem("userToken", response.token);
      
      navigate("/");
    },
  });

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Log In
        </Typography>
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
        <Button  type="submit" variant="gradient" fullWidth>
          Log In
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
    </Card>
  );
}
const Error = styled.span`
  font-size: 12px;
  color: red;
  position: absolute;
  left: 0;
`;