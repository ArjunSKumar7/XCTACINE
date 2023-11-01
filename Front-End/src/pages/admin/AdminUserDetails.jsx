import { userdetailsfetch } from "../../api/admin/adminApi";
import { AdminNavBar } from "../../components/admin/AdminNavBar";
import { AdminSideBar } from "../../components/admin/AdminSideBar";
import { AdminUserList } from "../../components/admin/AdminUserList";

import { useState, useEffect } from "react";

const AdminUserDetails = () => {
  const [userDetails, setuserDetails] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await userdetailsfetch();
      return response;
    }
    fetchData().then((data) => {
      setuserDetails(data.usersDetails);
    });
  }, []);


  return (
    <div>
     
      <AdminNavBar />

      <AdminSideBar />
      <div className='ms-[18.1rem] w-[calc(100vw-18.1rem)] h-[calc(98.9vh-56px)]'>
        <AdminUserList data={userDetails} />
      </div>
    </div>
  );
};

export default AdminUserDetails;
