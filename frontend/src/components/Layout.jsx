import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  const hidePaths = ["/login", "/register"];
  const shouldHide =
    hidePaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <div>
      {!shouldHide && <NavBar />}
      <main className="max-w-[95%] min-h-[80vh] m-auto ">{children}</main>
      {!shouldHide && <Footer />}
    </div>
  );
};

export default Layout;
