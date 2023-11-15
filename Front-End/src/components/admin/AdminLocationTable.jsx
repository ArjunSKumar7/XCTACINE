import { Typography,  Tooltip,
    IconButton,} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {  TrashIcon } from "@heroicons/react/24/solid";
import { AlertBox } from "../../components/AlertBox"
import { deleteLocation } from "../../api/admin/adminApi"
import { useState } from "react";
import { toast } from "react-toastify";

function AdminLocationTable(props) {
    const [open, setOpen] = useState(false);
    
const TABLE_HEAD = ["Location","Action"];
const adminLocationListDelete = async (id, location) => {
    console.log("aaa",id, location);
    const response = await deleteLocation(id);
  if(response?.status === 200){
    props?.refresh
    toast.success(`${response?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  } 
  else{
    toast.error(`${response?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

}

const handleOpen = () => setOpen(!open);
  return (
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
      {props?.locationList[0]?.location ? ( props?.locationList[0]?.location.map((location, index) => (
        <tr key={index} className="even:bg-blue-gray-50/50">
          <td className="p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {location}
            </Typography>
          </td>
         
          
          <td>
       <Tooltip content="Delete Location">
       <IconButton variant="text">
        <TrashIcon onClick={handleOpen}  class="h-6 w-6 text-black" />
        <AlertBox open={open} handleOpen={handleOpen} message={"Are you sure you want to delete this movie"} adminLocationListDelete={(id) => adminLocationListDelete(id, location)}/>
        </IconButton>
      </Tooltip>
    </td>
        </tr>
      ))):"No Location Added"}
    </tbody>
  </table>
  )
}

export default AdminLocationTable