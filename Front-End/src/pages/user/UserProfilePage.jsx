import React from 'react';
import { UserNavBar } from '../../components/user/UserNavBar';
import { UserFooter } from '../../components/user/UserFooter';
import { ProfileCard } from '../../components/user/ProfileCard';

function UserProfilePage() {
  return (
    <div className="w-full h-full bg-blue-gray-200">
      {/* UserNavBar Component */}
      <UserNavBar />

      {/* Content Section */}
      <div className="w-full flex flex-col ">
        {/* ProfileCard Component */}
        <ProfileCard />

        {/* Other Components */}
        {/* Include other components here between the ProfileCard and UserFooter */}
      </div>

      {/* UserFooter Component */}
      <UserFooter />
    </div>
  );
}

export default UserProfilePage;
