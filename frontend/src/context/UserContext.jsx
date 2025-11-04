import { createContext, useEffect, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    const userBlogs = async () => {
      try {
        const res = await api.get("/user/blogs");
        setBlogs(res.data.userBlogs);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    const userResources = async () => {
      try {
        const res = await api.get("/user/resources");
        setResources(res.data.userResources);
      } catch {
        setResources([]);
      } finally {
        setLoading(false);
      }
    };
    userBlogs();
    userResources();
    checkAuth();
  }, []);

  const login = async (identifier, password) => {
    try {
      const trimmedIdentifier = identifier.trim();
      const trimmedPassword = password.trim();

      const res = await api.post("/user/login", {
        identifier: trimmedIdentifier,
        password: trimmedPassword,
      });

      setUser(res.data.user);
      toast.success(res.data?.message || "Login Successfull");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const formData = new FormData();
      if (profileData.username) {
        formData.append("username", profileData.username);
      }
      if (profileData.name) {
        formData.append("name", profileData.name);
      }
      if (profileData.profilePic) {
        formData.append("image", profileData.profilePic);
      }
      const res = await api.patch("/user/updateprofile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return toast.success(res.data?.message || "Profiel updated successfully");
    } catch (error) {
      console.log(error.message);

      return toast.error("Profiel not updated");
    }
  };

  const contactUs = async (form) => {
    try {
      const res = await api.post("/user/contact", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(res.data?.message || "Message sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    loading,
    contactUs,
    updateProfile,
    blogs,
    resources,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
