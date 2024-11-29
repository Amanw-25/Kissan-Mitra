import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes/Approutes";
import PrivateRoute from "../routes/Privateroute";
import Mainloader from "./shared/apploaders/Mainloader";
import Navigationbar from "./shared/navbar/Navigationbar";
import "./Layout.css";
import Footer from "./layouts/footer/Footer";
import { useSelector } from "react-redux";
import Header from "./layouts/header/Header";

const Layout = () => {
  const { isUserAuthenticated } = useSelector((state) => state.userauthstate);

  return (
    <Suspense fallback={<Mainloader />}>
      <header className="sticky top-0 z-[100]">
        {isUserAuthenticated ? <Navigationbar /> : <Header />}
      </header>
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute element={element} />}
          />
        ))}
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Layout;
