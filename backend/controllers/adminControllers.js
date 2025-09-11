import BlogModel from "../models/Blog.js";
import resourcesModel from "../models/resourceModel.js";
import UserModel from "../models/UserModel.js";

// check it is admin
export const isAdmin = async (req, res, next) => {
  const user = await UserModel.findById(req.user.userId);
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "access denied, admin only" });
  }

  next();
};

// get all users
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

// get blogs by status
export const getBlogByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      filter.status = status;
    }

    const statusBlogs = await BlogModel.find(filter).populate(
      "author",
      "name username"
    );

    return res.status(200).json({
      success: true,
      message: "blogs get by status success",
      statusBlogs,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "blogs get by status unsuccess" });
  }
};

// get resources by status
export const getResByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status && ["pending", "approved", "rejected"].includes(status)) {
      filter.status = status;
    }

    const statusResources = await resourcesModel
      .find(filter)
      .populate("author", "name username");

    return res.status(200).json({
      success: true,
      message: "resources get by status success",
      statusResources,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "resources get by status unsuccess" });
  }
};

// update blog status

export const updateBlogStatus = async (req, res) => {
  try {
    const { blogid } = req.params;
    const { status } = req.body;

    const blog = await BlogModel.findByIdAndUpdate(blogid, { status: status });

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "blog not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "status updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "status not updated." + error.message });
  }
};

// update resources status
export const updateResStatus = async (req, res) => {
  try {
    const { resid } = req.params;
    const { status } = req.body;

    const resource = await resourcesModel.findByIdAndUpdate(resid, {
      status: status,
    });

    if (!resource) {
      return res
        .status(400)
        .json({ success: false, message: "resource not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "status updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "status not updated." + error.message });
  }
};
