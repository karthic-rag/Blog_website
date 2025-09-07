import express from "express";
import { registerUser } from "../controllers/authControllers.js";

const UserRouter = express.Router();

// register user
UserRouter.post("/register", registerUser);

export default UserRouter;
