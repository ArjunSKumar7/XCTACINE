import { ShoppingBagIcon,UserGroupIcon,FilmIcon } from "@heroicons/react/24/solid";
function TheatreDashboardTopComponent() {
  return (
    <div>
      <span  className="ml-96 p-10  text-2xl font-semibold text-red-900" >Theatre Dashboard</span>
      <div className="flex  gap-4 mt-2 ">
        <div className="bg-white rounded-sm p-5 m-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full flex items-center justify-center bg-light-blue-400 h-12 w-12">
            <ShoppingBagIcon className="h-6 w-6 rounded-full" />
          </div>
          <div className="pl-6">
            <span className="text-sm text-gray-500 font-light ">
              Total Sales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                12,000
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
              Total Customers
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                12,000
              </strong>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm p-5 m-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full flex items-center justify-center bg-light-green-600 h-12 w-12">
            <FilmIcon className="h-6 w-6 rounded-full" />
          </div>
          <div className="pl-6">
            <span className="text-sm text-gray-500 font-light ">
              Total No.of Bookings
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                12,000
              </strong>
            </div>
          </div>
        </div>
        {/* <div className="bg-white rounded-sm p-5 m-4 flex-1 border border-gray-200 flex items-center">
          <div className="rounded-full flex items-center justify-center bg-light-blue-400 h-12 w-12">
            <ShoppingBagIcon className="h-6 w-6 rounded-full" />
          </div>
          <div className="pl-6">
            <span className="text-sm text-gray-500 font-light ">
              Total Sales
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                12,000
              </strong>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default TheatreDashboardTopComponent;
