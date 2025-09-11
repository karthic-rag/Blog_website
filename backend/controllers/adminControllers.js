import BlogModel from "../models/Blog.js";
import UserModel from "../models/UserModel.js";

export const isAdmin = async (req, res, next) => {
  const user = await UserModel.findById(req.user.userId);
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "access denied, admin only" });
  }

  next();
};

export const getAllUsers = async (req, res) => {
  try {
    const Allusers = await UserModel.find().select("-password");

    return res
      .status(200)
      .json({ success: true, message: "all users get successfully", Allusers });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in get all users" + error.message,
    });
  }
};

export const getAllblogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find();

    return res
      .status(200)
      .json({ success: true, message: "all blogs get successfully", allBlogs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in get all blogs" + error.message,
    });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find();

    return res
      .status(200)
      .json({ success: true, message: "all blogs get successfully", allBlogs });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in get all blogs" + error.message,
    });
  }
};
