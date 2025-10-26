import express from "express";
import {
  addBlog,
  addComment,
  deleteBlog,
  deleteComment,
  getLatestBlog,
  getSpecComment,
  getSpecificBlog,
} from "../controllers/blogControllers.js";
import upload from "../middleware/multer.js";
import { isLoggedIn } from "../middleware/auth.js";

const blogRouter = express.Router();

// add new blog
blogRouter.post("/add", upload.single("image"), isLoggedIn, addBlog);

// delete blog
blogRouter.delete("/deleteblog/:blogid", isLoggedIn, deleteBlog);

//add comment
blogRouter.post("/addcomment", isLoggedIn, addComment);

// get comment for specific blog
blogRouter.get("/getcomment/:blogid", getSpecComment);

//delete comment
blogRouter.delete("/deletecomment/:commentid", isLoggedIn, deleteComment);

//getting latest blogs
blogRouter.get("/latest", getLatestBlog);

//getting specific blog
blogRouter.get("/specific/:blogId", getSpecificBlog);

export default blogRouter;
