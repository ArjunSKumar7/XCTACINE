import { useState, useEffect } from 'react';
import { AdminBannerList } from "../../components/admin/AdminBannerList";
import { AdminNavBar } from "../../components/admin/AdminNavBar";
import { AdminSideBar } from "../../components/admin/AdminSideBar";



const AdminBannerDetails = () => {

 
  return (
    <div>
      <AdminNavBar />
      <AdminSideBar />
      <div className='ms-[18.1rem] w-[calc(100vw-18.1rem)] h-[calc(98.9vh-56px)]'>
      <AdminBannerList />
      </div>
    </div>
  )
}

export default AdminBannerDetails