import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
  updateProfile,
} from "../controllers/userControllers.js";
import { isLoggedIn } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const UserRouter = express.Router();

// register user
UserRouter.post("/register", registerUser);

// login user
UserRouter.post("/login", loginUser);

// logout user
UserRouter.post("/logout", logOutUser);

//update profile
UserRouter.patch(
  "/updateprofile",
  upload.single("image"),
  isLoggedIn,
  updateProfile
);
export default UserRouter;
