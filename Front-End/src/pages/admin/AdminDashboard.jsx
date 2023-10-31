
import {AdminNavBar} from '../../components/admin/AdminNavBar'
import {AdminSideBar} from '../../components/admin/AdminSideBar'
import AdminDashBox from '../../components/admin/AdminDashBox'
import AdminDashGraph from '../../components/admin/AdminDashGraph'

const AdminDashboard = () => {
  return (
 


    <div className="h-screen overflow-hidden">
    <AdminNavBar />
    <div className="w-1/6">
      <AdminSideBar />
    </div>
    <div className="w-[calc(100vw-18.1rem)] h-screen  mt-11 fixed right-0 overflow-scroll pt-9  ">

     <AdminDashBox />
      <div className="flex">
        <div className="w-full">
        <AdminDashGraph/> 
        </div>
        {/* <div className="w-3/6"> 
      
        </div> */}


</div>

    </div>
  </div>
  )
}

export default AdminDashboard