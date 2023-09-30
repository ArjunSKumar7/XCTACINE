
import { UserNavBar } from "../../components/user/UserNavBar";
import  TheatreScreen  from "../../components/user/TheatreScreen";

function UserSeatBooking() {
  return (
    
    <div className="">
      <UserNavBar />
      <div className="bg-black w-full h-full  min-h-screen fixed mt-[5.5rem] ">
        <TheatreScreen/>
      </div>
    </div>
  );
}

export default UserSeatBooking;
    