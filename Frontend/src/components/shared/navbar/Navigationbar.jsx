import React, { useCallback, useEffect, useState } from "react";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useMediaquery } from "../../../hooks/usemediaQuery";
import NavList from "./menu/NavList";
import UserProfile from "../userprofile/UserProfile";
import { Menuopen } from "../../../constants";
import { useDispatch } from "react-redux";
import { OpenMobileviewNavbar } from "../../../redux/states/communitySlice";
import MobileviewNavbar from "../mobileviewnavbar/MobileviewNavbar";
import Cookies from "js-cookie";

function Navigationbar() {
  const [openNav, setOpenNav] = useState(false);
  const isMobileView = useMediaquery(900);
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  const handleMobileViewNavBar = useCallback(() => {
    dispatch(OpenMobileviewNavbar());
  }, [dispatch]);

  useEffect(() => {
    setOpenNav(isMobileView);
  }, [isMobileView]);

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
