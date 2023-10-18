import React from 'react';
import { UserNavBar } from '../../components/user/UserNavBar';
import { UserFooter } from '../../components/user/UserFooter';
import { ProfileCard } from '../../components/user/ProfileCard';
import { ProfileAccordion } from '../../components/user/ProfileAccordion';

function UserProfilePage() {
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
      <ProfileAccordion />  
      </div>
      </div>
      

      {/* UserFooter Component */}
      <UserFooter />
    </div>
  );
}

export default UserProfilePage;
