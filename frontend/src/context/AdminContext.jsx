import { createContext, useEffect, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const [count, setCount] = useState({});
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [comments, setComments] = useState([]);

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
    const AllComments = async () => {
      try {
        const res = await api.get("/admin/comments");
        setComments(res.data?.allComments);
      } catch (error) {
        console.log("Error in getting comments. " + error.message);
      }
    };
    
    AllBlogs();
    AllResources();
    getCounts();
    AllUsers();
    AllComments();
  }, []);

  const deleteComment = async (commentid) => {
      try {
      const res = await api.delete(`/blog/deletecomment/${commentid}`);
      return toast.success(res.data?.message || "comment deleted successfully");
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "comment deleting failed"
      );
    }
    };
  const values = { count, users, blogs, resources, comments, deleteComment };
  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};
