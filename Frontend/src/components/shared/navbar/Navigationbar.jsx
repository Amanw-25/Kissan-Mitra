// import React, { useCallback, useEffect, useState } from "react";
// import { Navbar, Typography, IconButton } from "@material-tailwind/react";
// import { useMediaquery } from "../../../hooks/usemediaQuery";
// import NavList from "./menu/NavList";
// import UserProfile from "../userprofile/UserProfile";
// import { Menuopen } from "../../../constants";
// import { useDispatch } from "react-redux";
// import { OpenMobileviewNavbar } from "../../../redux/states/communitySlice";
// import MobileviewNavbar from "../mobileviewnavbar/MobileviewNavbar";

// function Navigationbar() {
//   const [openNav, setOpenNav] = useState(false);
//   const isMobileView = useMediaquery(900);
//   const dispatch = useDispatch();

//   const handleMobileViewNavBar = useCallback(() => {
//     dispatch(OpenMobileviewNavbar());
//   }, [dispatch]);

//   useEffect(() => {
//     setOpenNav(isMobileView);
//   }, [isMobileView]);

//   return (
//     <Navbar
//       fullWidth={true}
//       className="sticky shadow-none border-none bg-custom-greentransparent-gradient-t-b top-0 w-full"
//     >
//       <div className="flex items-center justify-between text-blue-gray-900 w-full">
//         <Typography className="text-lg md:text-2xl font-semibold">
//           <span className="text-4xl text-pastelGreen-600">THE </span>{" "}
//           <span className="text-4xl text-portgore-600">K</span>ISSAN -{" "}
//           <span className="text-4xl text-portgore-600">M</span>ITRA
//         </Typography>
//         <div className="hidden gap-5 lg:flex">
//           <div className="hidden px-5 lg:block">
//             <NavList />
//           </div>
//           <UserProfile />
//         </div>
//         <IconButton
//           variant="text"
//           color="blue-gray"
//           className="lg:hidden"
//           onClick={handleMobileViewNavBar}
//         >
//           {openNav && (
//             <Menuopen className="size-7 text-black" strokeWidth={2} />
//           )}
//         </IconButton>
//       </div>
//       {isMobileView && <MobileviewNavbar />}
//     </Navbar>
//   );
// }

// export default Navigationbar;
import React, { useCallback, useEffect, useState } from "react";
import { Navbar, Typography, IconButton, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import { useMediaquery } from "../../../hooks/usemediaQuery";
import NavList from "./menu/NavList";
import UserProfile from "../userprofile/UserProfile";
import { Menuopen } from "../../../constants";
import { useDispatch } from "react-redux";
import { OpenMobileviewNavbar } from "../../../redux/states/communitySlice";
import MobileviewNavbar from "../mobileviewnavbar/MobileviewNavbar";
import Cookies from "js-cookie"; // Importing js-cookie to manage cookies

function Navigationbar() {
  const [openNav, setOpenNav] = useState(false);
  const isMobileView = useMediaquery(900);
  const dispatch = useDispatch();
  const Navigate = useNavigate(); // Initialize the useNavigate hook

  // Check if accessToken exists in cookies
  const accessToken = Cookies.get("accessToken");
  console.log("Access Token:", accessToken);

  const handleMobileViewNavBar = useCallback(() => {
    dispatch(OpenMobileviewNavbar());
  }, [dispatch]);

  useEffect(() => {
    setOpenNav(isMobileView);
  }, [isMobileView]);

  const handleSignIn = () => {
    // Redirect to the login page (auth route)
    Navigate("/auth");
  };

  return (
    <Navbar
      fullWidth={true}
      className="sticky shadow-none border-none bg-custom-greentransparent-gradient-t-b top-0 w-full"
    >
      <div className="flex items-center justify-between text-blue-gray-900 w-full">
        <div className="flex gap-2">
          <Typography className="text-lg md:text-2xl font-semibold">
            <span className="text-4xl text-pastelGreen-600">THE </span>{" "}
            <span className="text-3xl text-portgore-600">K</span>ISSAN - MITRA
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          {/* Conditionally render the "Sign In" button based on the presence of accessToken */}
          {!accessToken && (
            <div className="flex items-center gap-x-1">
              <Button
                size="sm"
                onClick={handleSignIn} // Redirects to /auth page
                className="rounded-xl lg:inline-block text-black text-base bg-pastelGreen-400 transition-all duration-700"
              >
                <span>Sign In</span>
              </Button>
            </div>
          )}
          {/* Conditionally render UserProfile or NavList based on accessToken */}
          {accessToken ? (
            <UserProfile />
          ) : (
            <div className="hidden gap-5 lg:flex">
              <NavList />
            </div>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={handleMobileViewNavBar}
        >
          {openNav && (
            <Menuopen className="size-7 text-black" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      {isMobileView && <MobileviewNavbar />}
    </Navbar>
  );
}

export default Navigationbar;
