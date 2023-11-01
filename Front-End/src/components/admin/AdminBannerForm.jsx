import React from "react";

import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { addBannerData } from "../../api/admin/adminApi";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

function AdminBannerForm(props) {
  const [BannerImage, setBannerImage] = useState(null);

  // const bannerSchema = Yup.object().shape({
  //   bannerName: Yup.string().min(15).required("Required"),
  //   bannerDescription: Yup.string().min(30).email("Invalid email").required("Required"),

  // });

  const formik = useFormik({
    initialValues: {
      bannerName: "",
      bannerDescription: "",
      // bannerImage: null,
    },
    onSubmit: async (values) => {
      const response = await addBannerData(values, BannerImage);

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
      props?.handleAddBannerOpen();
    },
  });
  const handleImageSubmit = (e) => {
    setBannerImage(e.target.files[0]);
  };
  return (
    <div className="">
      <Card className="mx-auto w-full ">
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Typography className="" variant="h6">
              Banner Name
            </Typography>
            <Input
              label="Banner Name"
              name="bannerName"
              type="text"
              size="lg"
              {...formik.getFieldProps("bannerName")}
            />
            <Typography className="-mb-2" variant="h6">
              Banner Description
            </Typography>
            <Input
              label=" Banner Description"
              name="bannerDescription"
              type="text"
              size="lg"
              {...formik.getFieldProps("bannerDescription")}
            />
            <Typography className="-mb-2" variant="h6">
              Banner Image
            </Typography>
            <Input
              label=" BannerImage"
              name="bannerImage"
              type="file"
              size="lg"
              onChange={handleImageSubmit}
            />

            {/* <Typography className="-mb-2" variant="h6">
              Banner Image
            </Typography>
            <Input
              label="Banner Image"
              name="bannerImage"
              size="lg"
              type="file"
              accept="image/*"
              onChange={(e) => {
                formik.setFieldValue("bannerImage", e.target.files[0]);
              }}
            /> */}
          </CardBody>
          <CardFooter className="pt-0 flex gap-60">
            <Button
              variant="gradient"
              size="sm"
              onClick={props?.handleAddBannerOpen}
              fullWidth
            >
              cancel
            </Button>
            <Button variant="gradient" size="sm" type="submit" fullWidth>
              Upload
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default AdminBannerForm;
