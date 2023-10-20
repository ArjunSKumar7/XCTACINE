import{ useState, useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { fetchUserData,editProfile } from "../../api/user/userApi";
import { useSelector } from "react-redux";

export function ProfileEdit(props) {
  const [UserData, setUserData] = useState("");
  const userId=useSelector((store)=>store.user.userId)
  console.log("userId",userId);

  useEffect(() => {
    async function fetchData(userId) {
      const response = await fetchUserData(userId);
      return response;
    }

    fetchData(userId).then((user) => {
      console.log("user", user?.userData);
      setUserData(user?.userData);
    });
  }, []);

  const ProfileEditSchema = Yup.object().shape({
    Name: Yup.string().required("Required"),
    Email: Yup.string().email("Invalid email").required("Required"),
    Mobile: Yup.string().required("Required"),
    ProfilePic: Yup.mixed()
      .test("fileFormat", "Invalid file format", (value) => {
        if (!value) {
          return true; // No file is selected, so it's valid
        }

        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

        // Check if the selected file format is in the allowed formats list
        return allowedFormats.includes(value.type);
      })
      .required("Required"), // Make sure a file is selected
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Mobile: "",
      ProfilePic: null,
    },
    validationSchema: ProfileEditSchema,
    enableReinitialize: true, // Reinitialize the form when initialValues change

    onSubmit: async (values) => {
      console.log("onSubmit function called");
      console.log("values", values);
      const response=await editProfile(values,userId)
    },
  });



  // Set the initial form values once when UserData changes
  useEffect(() => {
    if (UserData) {
      formik.setValues({
        Name: UserData.Name || "",
        Email: UserData.Email || "",
        Mobile: UserData.Mobile || "",
        ProfilePic: null, // Initialize the file input to null
        
      });
    }
  }, [UserData]);

  return (
    <Dialog open={props.open} handler={props.handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Edit Your Profile Details</DialogHeader>
      </div>
      {/* <form
      encType="multipart/form-data"
       onSubmit={formik.handleSubmit}> */}
        <DialogBody divider>
          <div className="grid gap-6">
            <Input size="lg" name="Name" label="Name" {...formik.getFieldProps("Name")} />
            {formik.errors.Name && formik.touched.Name && <Error>{formik.errors.Name}</Error>}

            <Input size="lg" name="Email" label="Email" {...formik.getFieldProps("Email")} />
            {formik.errors.Email && formik.touched.Email && <Error>{formik.errors.Email}</Error>}

            <Input
              size="lg"
              type="file"
              name="ProfilePic"
              label="ProfilePic"
              onChange={(event) => {
                formik.setFieldValue("ProfilePic", event.currentTarget.files[0]);
              }}
            />
            {formik.values.ProfilePic && formik.values.ProfilePic instanceof File && (
              <img src={URL.createObjectURL(formik.values.ProfilePic)} alt="Profile Pic" width="100" />
            )}

            <Input size="lg" name="Mobile" label="Mobile" {...formik.getFieldProps("Mobile")} />
            {formik.errors.Mobile && formik.touched.Mobile && <Error>{formik.errors.Mobile}</Error>}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={props.handleOpen}>
            Close
          </Button>
          <Button onClick={formik.submitForm} variant="gradient" color="green" >
            Save Changes
          </Button>
        </DialogFooter>
      {/* </form> */}
    </Dialog>
  );
}

const Error = styled.span`
  font-size: 12px;
  color: red;
  position: relative;
  top: -10px;
  height: 0;
`;
