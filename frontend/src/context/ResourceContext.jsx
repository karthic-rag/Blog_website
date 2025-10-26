import { createContext, useState } from "react";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const ResourceContext = createContext();

export const ResourceContextProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [appResources, setAppResources] = useState([]);

  useEffect(() => {
    const getAllResources = async () => {
      try {
        const res = await api.get("/resource/latest");

        setResources(res.data.resources);
      } catch (error) {
        setResources([]);
      }
    };
    const getAppRes = async () => {
      try {
        const res = await api.get("/user/allresources");

        setAppResources(res.data?.allResources);
      } catch (error) {
        setAppResources([]);
      }
    };

    getAppRes();
    getAllResources();
  }, []);
  const addResource = async (resource, image) => {
    try {
      const formData = new FormData();
      formData.append("resources", JSON.stringify(resource));
      if (image) {
        formData.append("image", image);
      }
      const res = await api.post("/resource/addresource", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      return toast.success(res.data?.message || "Resource added successfully");
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "Resource adding failed"
      );
    }
  };

  const values = { addResource, resources, appResources };
  return (
    <ResourceContext.Provider value={values}>
      {children}
    </ResourceContext.Provider>
  );
};
