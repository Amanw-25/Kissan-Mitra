import React from "react";
import UserinfoSection from "./sections/UserinfoSection";
import ProfileSection from "./sections/ProfileSection";

const ProfileContainer = () => {
 
  return (
    <div className="min-h-screen pt-9 bg-custom-light-green-to-white">
      <section className=" w-[90%] mx-auto space-y-6">
        <section className="grid md:grid-cols-2 place-items-center">
          <ProfileSection />
          <UserinfoSection />
        </section>
      </section>
    </div>
  );
};

export default ProfileContainer;
