import { ShoppingBagIcon,UserGroupIcon,} from "@heroicons/react/24/solid";
// import {useSelector} from "react-redux"
import { useEffect,useState } from "react"
import { fetchDashBoxInfo } from "../../api/admin/adminApi";
function AdminDashBox() {
  const[dashInfo,setDashInfo] = useState({})
  useEffect(() => {
    async function fetchInfo(){
      const data =await fetchDashBoxInfo();
     console.log(data)
     setDashInfo(data)
    }

    fetchInfo()
  },[])

  const totalUsers = dashInfo?.usersCount|| 0;
  const totalTheatres = dashInfo?.theatresCount|| 0;
  return (
    <div>
      <span  className="ml-96 p-10  text-2xl font-semibold text-red-900" >Admin Dashboard</span>
      <div className="flex  gap-4 mt-2 ">
        <div className="bg-white rounded-sm p-5 m-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full flex items-center justify-center bg-light-blue-400 h-12 w-12">
            <ShoppingBagIcon className="h-6 w-6 rounded-full" />
          </div>
          <div className="pl-6">
            <span className="text-sm text-gray-500 font-light ">
              Total Users
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
              {totalUsers}
              </strong>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm p-5 m-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full flex items-center justify-center bg-orange-400 h-12 w-12">
            <UserGroupIcon className="h-6 w-6 rounded-full" />
          </div>
          <div className="pl-6">
            <span className="text-sm text-gray-500 font-light ">
              Total Theatres
            </span>
            <div className="flex items-center">
              <strong  className="text-xl text-gray-700 font-semibold">
              {totalTheatres}
              </strong>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default AdminDashBox;
