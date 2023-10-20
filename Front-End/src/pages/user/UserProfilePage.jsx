import React, { useEffect, useState } from 'react';
import { UserNavBar } from '../../components/user/UserNavBar';
import { UserFooter } from '../../components/user/UserFooter';
import { ProfileCard } from '../../components/user/ProfileCard';
import { ProfileAccordion } from '../../components/user/ProfileAccordion';
import { useSelector } from 'react-redux';
import { fetchUserBookings } from '../../api/user/userApi';

function UserProfilePage() {
  const userId=useSelector((store)=>store.user.userId)

  const [upcomingBookings, setUpcomingBookings] = useState([]);

useEffect(() => {
  async function fetchData(){
    const response =await fetchUserBookings(userId);
    const currentDate = new Date();

    // Filter bookings where the show date is greater than the current date
    const upcomingBookings = response.response.filter(booking => {
      const showDate = new Date(booking.showDate);
      return showDate > currentDate;
    });

    // Set the upcoming bookings in a new state
    setUpcomingBookings(upcomingBookings);
  }
  fetchData()
},[])


  return (
    <div className="w-full h-full bg-blue-gray-200">
      {/* UserNavBar Component */}
      <UserNavBar />

      {/* Content Section */}
      <div className="w-full flex flex-row ">
        {/* ProfileCard Component */}
        <ProfileCard />

        {/* Other Components */}
        {/* Include other components here between the ProfileCard and UserFooter */}
        <div  className='pt-28 ml-2 '>
      <ProfileAccordion upcomingBookings={upcomingBookings} />  
      </div>
      </div>
      

      {/* UserFooter Component */}
      <UserFooter />
    </div>
  );
}

export default UserProfilePage;
