import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { fetchUserData, editProfile } from "../../api/user/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DropzoneUploader from "react-dropzone-uploader";

export function ProfileEdit(props) {
  // const handleFileUpload = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   console.log("formData", formData);
  // };

  console.log("props", props);

  const userId = useSelector((store) => store.user.userId);
  console.log("userId", userId);

  const ProfileEditSchema = Yup.object().shape({
    Name: Yup.string().required("Required"),
    Email: Yup.string().email("Invalid email").required("Required"),
    Mobile: Yup.string().required("Required"),
    // ProfilePic: Yup.mixed()
    //   .test("fileFormat", "Invalid file format", (value) => {
    //     if (!value) {
    //       return true; // No file is selected, so it's valid
    //     }

    //     const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

    //     // Check if the selected file format is in the allowed formats list
    //     return allowedFormats.includes(value.type);
    //   })
    //   .required("Required"), // Make sure a file is selected
  });

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Mobile: "",
      // ProfilePic: null,
    },
    validationSchema: ProfileEditSchema,
    enableReinitialize: true, // Reinitialize the form when initialValues change

    onSubmit: async (values) => {
      console.log("onSubmit function called");
      console.log("values", values);
      const response = await editProfile(values, userId);
      console.log("response", response);

      if (
        response?.user?.modifiedCount > 0 ||
        response?.user?.modifiedCount === 0
      ) {
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

  // Set the initial form values once when UserData changes
  useEffect(() => {
    if (props?.UserData) {
      formik.setValues({
        Name: props?.UserData?.Name || "",
        Email: props?.UserData?.Email || "",
        Mobile: props?.UserData?.Mobile || "",
        // ProfilePic: props?.UserData?.ProfilePic || null, // Initialize the file input to null
      });
    }
  }, [props?.UserData]);

  return (
    <Dialog open={props?.open} handler={props?.handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader>Edit Your Profile Details</DialogHeader>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              size="lg"
              name="Name"
              label="Name"
              {...formik.getFieldProps("Name")}
            />
            {formik.errors.Name && formik.touched.Name && (
              <Error>{formik.errors.Name}</Error>
            )}

            <Input
              size="lg"
              name="Email"
              label="Email"
              {...formik.getFieldProps("Email")}
            />
            {formik.errors.Email && formik.touched.Email && (
              <Error>{formik.errors.Email}</Error>
            )}

            {/* <Input
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
            )} */}

            {/* <DropzoneUploader
              onUpload={(file) => {
                formik.setFieldValue("ProfilePic", file);
                console.log("Uploaded File:", file);
              }}

              accept="image/*"
              style={{
                // Set the height you desire for the preview container (e.g., 200px)
                height: "50px",
              }}
            /> */}


{/* <DropzoneUploader
  onUpload={(files) => {
    if (files.length > 0) {
      formik.setFieldValue("ProfilePic", files[0]); // Get the first file in the array
      console.log("Uploaded File:", files[0]);
    }
  }}
  maxFiles={1} // Allow only one file to be selected
  accept="image/*"
  style={{
    height: "50px", // Set the desired height for the preview container
  }}
/> */}
{/* By configuring the DropzoneUploader to accept only one file (maxFiles={1}) and then handling the first file in the array when the onUpload function is called, you can ensure that the ProfilePic field in your form will contain a single file object.

With these changes, you should have the correct file data in the ProfilePic field when the form is submitted. */}







            {/* {formik.values.ProfilePic && formik.values.ProfilePic.file && (
              <img
                src={URL.createObjectURL(formik.values.ProfilePic.file)}
                alt="Profile Pic"
                width="100"
              />
            )} */}

            <Input
              size="lg"
              name="Mobile"
              label="Mobile"
              {...formik.getFieldProps("Mobile")}
            />
            {formik.errors.Mobile && formik.touched.Mobile && (
              <Error>{formik.errors.Mobile}</Error>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={props?.handleOpen}>
            Close
          </Button>
          <Button
            onClick={props?.handleOpen}
            type="submit"
            variant="gradient"
            color="green"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </form>
      
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
