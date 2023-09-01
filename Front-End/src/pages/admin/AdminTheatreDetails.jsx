import { useState, useEffect } from 'react';
import { AdminTheatreList } from "../../components/admin/AdminTheatreList";
import { AdminNavBar } from "../../components/admin/AdminNavBar";
import { AdminSideBar } from "../../components/admin/AdminSideBar";
import {theatredetailsfetch} from "../../api/admin/adminApi"


const AdminTheatreDetails = () => {
  const [TheatreDetails,setTheatreDetails] = useState();
 
  useEffect(() => {
    async function fetchData() {
      const response = await theatredetailsfetch();
      console.log("theatredetailsfetch", response);
      return response;
    }

    fetchData().then(data => {
      console.log("data", data);
      setTheatreDetails(data?.theatreDetails);

    });
  }, []);
 
console.log("TheatreDetails",TheatreDetails)
  return (
    <div>
      <AdminNavBar />
      <AdminSideBar />
      <div className='ms-[18.1rem] w-[calc(100vw-18.1rem)] h-[calc(98.9vh-56px)]'>
      <AdminTheatreList data={TheatreDetails} />
      </div>
    </div>
  )
}

export default AdminTheatreDetails