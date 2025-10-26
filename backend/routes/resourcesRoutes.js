import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {
  addResources,
  deleteRes,
  getLatestResources,
} from "../controllers/resourcesControllers.js";
import upload from "../middleware/multer.js";

const resourcesRoutes = express.Router();

// adding new resources
resourcesRoutes.post(
  "/addresource",
  upload.single("image"),
  isLoggedIn,
  addResources
);

// delete resource
resourcesRoutes.delete("/deleteres/:resid", isLoggedIn, deleteRes);

// latest resources
resourcesRoutes.get("/latest", getLatestResources);

export default resourcesRoutes;
