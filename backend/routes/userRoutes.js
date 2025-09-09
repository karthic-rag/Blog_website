import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/authControllers.js";
import { isLoggedIn } from "../middleware/auth.js";

const UserRouter = express.Router();

// register user
UserRouter.post("/register", registerUser);

// login user
UserRouter.post("/login", loginUser);

UserRouter.post("/get", isLoggedIn);

// logout user
UserRouter.post("/logout", logOutUser);

export default UserRouter;
