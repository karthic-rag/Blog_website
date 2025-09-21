import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {
  getAllComments,
  getAllUsers,
  getBlogByStatus,
  getResByStatus,
  isAdmin,
  updateBlogStatus,
  updateResStatus,
} from "../controllers/adminControllers.js";

const adminRouter = express.Router();

// getting all users
adminRouter.get("/allusers", isLoggedIn, isAdmin, getAllUsers);

// get blogs by status
adminRouter.get("/statusblog", isLoggedIn, isAdmin, getBlogByStatus);

// get resources by status
adminRouter.get("/statusres", isLoggedIn, isAdmin, getResByStatus);

// edit blogs status
adminRouter.patch("/editblog/:blogid", isLoggedIn, isAdmin, updateBlogStatus);

// edit resources status
adminRouter.patch("/editres/:resid", isLoggedIn, isAdmin, updateResStatus);

// get all comments
adminRouter.get("/comments", isLoggedIn, isAdmin, getAllComments);

export default adminRouter;
