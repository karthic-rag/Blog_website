import express from "express";
import { addBlog } from "../controllers/blogControllers.js";
import upload from "../middleware/multer.js";
import { isLoggedIn } from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), isLoggedIn, addBlog);

export default blogRouter;
