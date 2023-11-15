import { Input, Card, Typography, Button } from "@material-tailwind/react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { addLocation,fetchLocations } from "../../api/admin/adminApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import{setLocationToList}from "../../redux/adminReducer"

import AdminLocationTable from "./AdminLocationTable";


const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

function AdminLocationAdd() {
  const [refreshList, setRefreshList] = useState(false);
  function refresh() {
    setRefreshList(!refreshList);
  }

  const dispatch = useDispatch();
  const LocationSchema = Yup.object().shape({
    LocationField: Yup.string()
      .required("Required")
      .min(3, "Must be 3 characters or more")
      .max(20, "Max 20 characters only")
      .matches(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  });

  const formik = useFormik({
    initialValues: {
      LocationField: "",
    },
    validationSchema: LocationSchema,
    onSubmit: async (values) => {
      const LocationApiResponse = await addLocation(values);
      if (LocationApiResponse.status === 200&&201) {
        refresh();
        toast.success(`${LocationApiResponse.message}`, {
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
        toast.error(`${LocationApiResponse.message}`, {
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
  
  useEffect(() => {
    
    async function fetchData() {
      const response = await fetchLocations();
      return response;
    }
    fetchData().then((data) => {
      console.log(data);
      dispatch(setLocationToList(data?.locationData));      
    });
  },[dispatch,refreshList]);
  const locationList = useSelector((store) => store.admin.locationToList);
  console.log(locationList);

  return (

    <div className="ms-[19.9rem] w-[calc(98vw-20rem)] h-auto">
      <form
        className="w-72 mt-32 ml-6 rounded-none flex gap-2 "
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Add Location"
          name="LocationField"
          {...formik.getFieldProps("LocationField")}
        />
        <Button size="sm" type="submit">
          Add
        </Button>
      </form>

      <Card className=" mt-12 overflow-auto">
       <AdminLocationTable locationList={locationList} function={refresh}/>
      </Card>
    </div>
  );
}

export default AdminLocationAdd;
