// import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Input,
//   Textarea,
// } from "@material-tailwind/react";
 
// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import { toast } from "react-toastify";
// import styled from "styled-components";
// import * as Yup from "yup";
// import { fetchUserData } from "../../api/user/userApi";

// export function ProfileEdit(props) {
//   const [UserData, setUserData] = useState("");
//     useEffect(() => {
//             async function fetchData() {
//               const userId = localStorage.getItem("userId");
//               const response = await fetchUserData(userId);
//               return response;
//             }
          
//             fetchData().then((user) => {
//               console.log("user", user?.userData);
//               setUserData(user?.userData);
//             });
//           }, []); 


//             const ProfileEditSchema = Yup.object().shape({
//     Name: Yup.string().required("Required"),
//     Email: Yup.string().email("Invalid email").required("Required"),

//     Mobile: Yup.string().required("Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       Name: UserData?.Name || "", // Provide a default value if UserData.Name is undefined
//       Email: UserData?.Email || "",
//       Mobile: UserData?.Mobile || "",
//       ProfilePic: Yup.mixed()
//         .test("fileFormat", "Invalid file format", (value) => {
//           if (!value) {
//             return true; // No file is selected, so it's valid
//           }

//           const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

//           // Check if the selected file format is in the allowed formats list
//           return allowedFormats.includes(value.type);
//         })
//         .required("Required"), // Make sure a file is selected
//     },
//     validationSchema: ProfileEditSchema,
//     // enableReinitialize: true, // Enable reinitialization

//     onSubmit: async (values) => {
//       console.log("onSubmit function called");
//       console.log("values", values);
//     },
//   });


 
//   return (
//     <>
     
//       <Dialog open={props.open} handler={props.handleOpen}>
//         <div className="flex items-center justify-between">
//           <DialogHeader>Edit Your Pofile Details</DialogHeader>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="mr-3 h-5 w-5"
//             onClick={props.handleOpen}
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         <form onSubmit={formik.handleSubmit}>
//         <DialogBody divider>
      
//           <div className="grid gap-6">
           
//           <Input
//                 size="lg"
//                 name="Name"
//                 label="Name"
//                 {...formik.getFieldProps("Name")}
//               />
//               {formik.errors.Name && formik.touched.Name && (
//                 <Error>{formik.errors.Name}</Error>
//               )}

//               <Input
//                 size="lg"
//                 name="Email"
//                 label="Email"
//                 {...formik.getFieldProps("Email")}
//               />
//               {formik.errors.Email && formik.touched.Email && (
//                 <Error>{formik.errors.Email}</Error>
//               )}

//               <Input
//                 size="lg"
//                 type="file" // Use type="file" for file input
//                 name="ProfilePic"
//                 label="ProfilePic"
//                 // Handle the file selection and set formik value accordingly
//                 onChange={(event) => {
//                   formik.setFieldValue(
//                     "ProfilePic",
//                     event.currentTarget.files[0]
//                   );
//                 }}
//               />
//               {/* Display a preview of the selected image if available */}
//               {formik.values.ProfilePic &&
//                 formik.values.ProfilePic instanceof File && (
//                   <img
//                     src={URL.createObjectURL(formik.values.ProfilePic)}
//                     alt="Profile Pic"
//                     width="100"
//                   />
//                 )}

             
//               <Input
//                 size="lg"
//                 name="Mobile"
//                 label="Mobile"
//                 {...formik.getFieldProps("Mobile")}
//               />
//               {formik.errors.Mobile && formik.touched.Mobile && (
//                 <Error>{formik.errors.Mobile}</Error>
//               )}






          
//           </div>
//         </DialogBody>
//         <DialogFooter className="space-x-2">
//           <Button variant="outlined" color="red" onClick={props.handleOpen}>
//             close
//           </Button>
//           <Button variant="gradient" color="green" onClick={props.handleOpen}>
//             send message
//           </Button>
//         </DialogFooter>
//       </form>
//       </Dialog>
//     </>
//   );
// }
// const Error = styled.span`
//   font-size: 12px;
//   color: red;
//   position: relative;
//   top: -10px;
//   height: 0;
// `;


import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { fetchUserData } from "../../api/user/userApi";

export function ProfileEdit(props) {
  const [UserData, setUserData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem("userId");
      const response = await fetchUserData(userId);
      return response;
    }

    fetchData().then((user) => {
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
      <form onSubmit={formik.handleSubmit}>
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
          <Button variant="gradient" color="green" type="submit">
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
