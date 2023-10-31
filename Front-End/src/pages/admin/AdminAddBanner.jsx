import React from "react";
import { AdminNavBar } from "../../components/admin/AdminNavBar";
import { AdminSideBar } from "../../components/admin/AdminSideBar";
import AdminBannerForm from "../../components/admin/AdminBannerForm";
function AdminAddBanner() {
  return (
    <div>
      <div>
        <AdminNavBar />
      </div>
      <div>
        <AdminSideBar />
      </div>
      <div className="ml-[20rem] pt-28">
    <AdminBannerForm/>
      </div>
    </div>
  );
}

export default AdminAddBanner;
