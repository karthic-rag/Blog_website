import { createContext, useEffect, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";

export const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [AppBlogs, setAppBlogs] = useState([]);

  useEffect(() => {
    const getLatestBlogs = async () => {
      try {
        const res = await api.get("/blog/latest");

        setBlogs(res.data?.blogs);
      } catch (error) {
        setBlogs([]);
      }
    };
    const getAppBlogs = async () => {
      try {
        const res = await api.get("/user/allblogs");

        setAppBlogs(res.data?.allBlogs);
      } catch (error) {
        setAppBlogs([]);
      }
    };

    getAppBlogs();
    getLatestBlogs();
  }, []);
  const addBlog = async (blog, image) => {
    try {
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog)); // Send blog as JSON string
      if (image) {
        formData.append("image", image);
      }
      const res = await api.post("/blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return toast.success(res.data?.message || "Blog added successfully");
    } catch (error) {
      return toast.error(error.response?.data?.message || "Blog adding failed");
    }
  };
  const getSpecificBlog = async (blogId) => {
    try {
      const res = await api.get(`/blog/specific/${blogId}`);
      return res.data?.blog;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const addComment = async (content, blogId) => {
    try {
      const res = await api.post(`/blog/addcomment`, { content, blogId });
      return toast.success(res.data?.message || "comment added successfully");
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "comment adding failed"
      );
    }
  };

  const getSpecComments = async (blogId) => {
    try {
      const res = await api.get(`/blog/getcomment/${blogId}`);

      return res.data?.comments;
    } catch (error) {
      return console.log(
        error.response?.data?.message || "comment adding failed"
      );
    }
  };

  const values = {
    addBlog,
    blogs,
    AppBlogs,
    getSpecComments,
    getSpecificBlog,
    addComment,
  };
  return <BlogContext.Provider value={values}>{children}</BlogContext.Provider>;
};
