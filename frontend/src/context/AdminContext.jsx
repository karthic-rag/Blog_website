import { createContext, useEffect, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [count, setCount] = useState({});
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const res = await api.get("/admin/getcounts");
        setCount(res.data?.counts);
      } catch (error) {
        console.log("Error in getting counts. " + error.message);
      }
    };

    const AllUsers = async () => {
      try {
        const res = await api.get("/admin/allusers");
        setUsers(res.data?.allUsers);
      } catch (error) {
        console.log("Error in getting users. " + error.message);
      }
    };
    const AllBlogs = async () => {
      try {
        const res = await api.get("/admin/statusblog");
        setBlogs(res.data?.statusBlogs);
      } catch (error) {
        console.log("Error in getting blogs. " + error.message);
      }
    };
    const AllResources = async () => {
      try {
        const res = await api.get("/admin/statusres");
        setResources(res.data?.statusResources);
      } catch (error) {
        console.log("Error in getting resources. " + error.message);
      }
    };
    AllBlogs();
    AllResources();
    getCounts();
    AllUsers();
  }, []);
  const values = { count, users, blogs, resources };
  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};
