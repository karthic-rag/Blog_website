import express from "express";
import {
  contactUs,
  getProfile,
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

// getting all blogs
UserRouter.get("/allblogs", getAllblogs);

// getting all resources
UserRouter.get("/allresources", getAllResources);

// contact admin
UserRouter.post("/contact", isLoggedIn, contactUs);

export default UserRouter;
