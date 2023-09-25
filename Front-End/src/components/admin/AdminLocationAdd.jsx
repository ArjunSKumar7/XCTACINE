import { Input, Card, Typography, Button } from "@material-tailwind/react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { addLocation } from "../../api/admin/adminApi";
import { toast } from "react-toastify";

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
      console.log("apiResponse", LocationApiResponse);
      if (LocationApiResponse.status === 200&&201) {
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
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ name, job, date }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default AdminLocationAdd;
