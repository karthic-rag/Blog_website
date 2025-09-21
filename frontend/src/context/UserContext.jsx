import { createContext, useEffect, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
      toast.error(error.response?.data?.message) || "Login failed";
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

  const value = { user, setUser, login, logout, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
