import express from "express";
import {
  contactUs,
  getProfile,
  getUserBlogs,
  getUserResources,
  loginUser,
  logOutUser,
  registerUser,
  updateProfile,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  getAllblogs,
  getAllResources,
} from "../controllers/userControllers.js";

const UserRouter = express.Router();

// register user
UserRouter.post("/register", registerUser);

// login user
UserRouter.post("/login", loginUser);

// logout user
UserRouter.post("/logout", logOutUser);

// get profile
UserRouter.get("/profile", isLoggedIn, getProfile);

//update profile
UserRouter.patch(
  "/updateprofile",
  upload.single("image"),
  isLoggedIn,
  updateProfile
);

//user blogs
UserRouter.get("/blogs", isLoggedIn, getUserBlogs);

//user resources
UserRouter.get("/resources", isLoggedIn, getUserResources);

// getting all blogs
UserRouter.get("/allblogs", getAllblogs);

// getting all resources
UserRouter.get("/allresources", getAllResources);

// contact admin
UserRouter.post("/contact", isLoggedIn, contactUs);

export default UserRouter;
