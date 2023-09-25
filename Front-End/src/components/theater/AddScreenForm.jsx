import { useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import  {addScreen } from "../../api/theater/theaterApi";
import { useDispatch, useSelector } from "react-redux";


export function AddScreenForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEnabled, setShowEnabled] = useState([false, false, false, false, false, false]);
  // const screenListForUpdation = useSelector(
  //   (store) => store.theater.allScreenList
  // );
  const theatreInfo = useSelector((store) => store.theatre.theatreDetails);
  console.log("theaterInfo", theatreInfo);

  const formik = useFormik({
    initialValues: {
      screenName: "",
      Rows: 0,
      Columns: 0,
      shows:[],
      show1: "00:00",
      show2: "00:00",
      show3: "00:00",
      show4: "00:00",
      show5: "00:00",
      show6: "00:00",
    },
    validationSchema: Yup.object({
      screenName: Yup.string()

        .max(25, "Must be 25 characters or less")
        .required("Required"),
      Rows: Yup.number().required("Required"),
      Columns:
        Yup.number()
        .required("Required"),

      show1: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show2: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show3: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show4: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show5: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
      show6: Yup.string()
        .matches(
          /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid time format (HH:MM)"
        )
        .required("Required"),
    }),

    onSubmit: async (values) => {
      const enabledShowFields = {};
      for (let i = 1; i <= 6; i++) {
        if (showEnabled[i - 1]) {
          enabledShowFields[`show${i}`] = values[`show${i}`];
        }
      }
    console.log("enabledShowFields", enabledShowFields);
      // Add enabled show fields to the values object
      values = {
        ...values,
        ...enabledShowFields,
      };
      values.theatreId = theatreInfo.theatreId;
      values.theatreName = theatreInfo.theatreName;
      values.shows = [enabledShowFields];
      console.log("screenvalues",values);
      const response = await addScreen(values);

      // const updatedScrnList = [
      //   ...screenListForUpdation,
      //   response?.addedScreenObj,
      // ];
      dispatch(setAddedScreens(values));//updatedScrnList
      

      console.log(" page ", response);
      if (response?.status === "success") {
        toast.success(` Screen added successfully !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/screenlist");
      }
      props.handleAddScreenOpen();
    },
  });

const handleshowEnabled = (index) => {
  const newShowEnabled = [...showEnabled];
  newShowEnabled[index] = !newShowEnabled[index];
  setShowEnabled(newShowEnabled);
}


  return (
    <div className="m-2" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <div className="w-80">
            <Typography color="black">Screen name</Typography>
            <Input
              color="teal"
              label="screenName"
              type="string"
              {...formik.getFieldProps("screenName")}
            />
            <p className=" text-xs ml-2 text-red-800">
              {formik.touched.screenName && formik.errors.screenName
                ? formik.errors.screenName
                : null}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="w-80">
              <Typography color="black">Rows</Typography>
              <Input
                color="teal"
                label="select number of rows "
                type="number"
                {...formik.getFieldProps("Rows")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.Rows && formik.errors.Rows
                  ? formik.errors.Rows
                  : null}
              </p>
            </div>
            <div className="w-80">
              <Typography color="black">Columns</Typography>
              <Input
                color="teal"
                label="select number of columns of seat"
                type="number"
                {...formik.getFieldProps("Columns")}
              />
              <p className=" text-xs ml-2 text-red-800">
                {formik.touched.Columns && formik.errors.Columns
                  ? formik.errors.Columns
                  : null}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 ">
            {showEnabled.map((enabled, index) => (
              <div className="w-20" key={index}>
                <Typography color="black">show {index + 1}</Typography>
                <Input
                  color="teal"
                  label={`show ${index + 1} time`}
                  type="time"
                  {...formik.getFieldProps(`show${index + 1}`)}
                  disabled={!enabled}
                />
                <p className=" text-xs ml-2 text-red-800">
                  {formik.touched[`show${index + 1}`] && formik.errors[`show${index + 1}`]
                    ? formik.errors[`show${index + 1}`]
                    : null}
                </p>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => handleshowEnabled(index)}
                    variant="outlined"
                    color="teal"
                  >
                    {enabled ? "Disable" : "Enable"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

        

          <div className="flex justify-center">
            <Button type="submit" variant="gradient" color="teal">
              <span>Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}