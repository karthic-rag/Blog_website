import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import menu from "../assets/menu.png"
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // sidebar
  const [dropDown, setDropDown] = useState(false); // profile dropdown
  const { user, logout } = useContext(UserContext);

  const menuRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Common nav links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  // Dropdown menu items
  const dropdownItems = [
    { name: "Create Blog", path: "/create-blog" },
    { name: "Create Resource", path: "/create-resource" },
    { name: "Profile", path: "/profile" },
    ...(user?.role === "admin" ? [{ name: "Dashboard", path: "/admin" }] : []),
    { name: "Logout", path: "/", action: logout },
  ];

  return (
    <div className="max-w-[95%] min-h-15 m-auto bg-white rounded-lg flex justify-between items-center px-4">
      {/* Left side: */}
      <div className="flex items-center gap-3 w-[60%] justify-between md:w-auto">
        {/* Mobile menu bar */}
        <img
          src={menu}
          alt="menu"
          width={35}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer md:hidden"
        />
        <h1 className="font-bold text-lg">Resource Hub</h1>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center gap-x-6 flex-grow justify-center">
        {navLinks.map((link) => (
          <NavLink key={link.name} to={link.path}>
            <p className="text-light-gray hover:text-web-blue">{link.name}</p>
            <hr className="border-none outline-none h-0.5 bg-web-blue w-3/5 m-auto hidden" />
          </NavLink>
        ))}
      </div>

      {/* Right side: profile/login */}
      <div className="flex items-center " ref={menuRef}>
        {user ? (
          <div className="relative">
            <img
              src={user?.profile?.url || "/default-avatar.png"}
              alt="profile"
              width={40}
              className="w-12 h-12 rounded-full object-cover"
              onClick={() => setDropDown((prev) => !prev)}
            />
            {dropDown && (
              <div className="absolute right-0 mt-2 w-44 bg-dark-gray text-white font-medium rounded-lg shadow-lg p-3 z-50">
                {dropdownItems.map((item, i) => (
                  <div key={i}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (item.action) item.action();
                        setDropDown(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                    {i < dropdownItems.length - 1 && (
                      <hr className="my-2 border-gray-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <p className="px-4 py-2 bg-web-blue rounded-lg text-white font-medium">
              Login
            </p>
          </NavLink>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
