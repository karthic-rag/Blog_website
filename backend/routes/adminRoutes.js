import express from "express";
import { isLoggedIn } from "../middleware/auth.js";
import {
  getAllblogs,
  getAllUsers,
  isAdmin,
} from "../controllers/adminControllers.js";

const adminRouter = express.Router();

// getting all users
adminRouter.get("/allusers", isLoggedIn, isAdmin, getAllUsers);

// getting all blogs
adminRouter.get("/allblogs", isLoggedIn, isAdmin, getAllblogs);

// getting all resources
adminRouter.get("/allresources", isLoggedIn, isAdmin, getAllUsers);

export default adminRouter;
