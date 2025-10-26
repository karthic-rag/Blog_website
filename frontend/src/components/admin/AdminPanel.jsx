import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  FileText,
  FolderClosed,
  MessageCircleMore,
  Undo2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { AdminContextProvider } from "../../context/AdminContext";

export default function AdminPanel({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdminContextProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-lg z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-web-blue">Admin Panel</h2>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-3">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <Home className="w-5 h-5" /> <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <Users className="w-5 h-5" /> <span>Users</span>
            </NavLink>
            <NavLink
              to="/admin/blogs"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <FileText className="w-5 h-5" /> <span>Blogs</span>
            </NavLink>
            <NavLink
              to="/admin/resources"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <FolderClosed className="w-5 h-5" /> <span>Resources</span>
            </NavLink>
            <NavLink
              to="/admin/comments"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <MessageCircleMore className="w-5 h-5" /> <span>comments</span>
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 hover:text-blue-600 ${
                  isActive ? "font-bold text-blue-600" : ""
                }`
              }
            >
              <Undo2 className="w-5 h-5" /> <span>Return to home</span>
            </NavLink>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Topbar */}
          <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-web-blue">Admin Panel</h1>
          </header>

          {/* Content Area */}
          <main className="flex-1 p-6 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </AdminContextProvider>
  );
}
