import fs from "fs";
import imagekit from "../configs/imageKit.js";
import BlogModel from "../models/Blog.js";
import UserModel from "../models/UserModel.js";
import commentModel from "../models/CommentModel.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //upload Image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimize through imagekit URL transformation
    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = { url: optimizedImage, id: response.fileId };

    await BlogModel.create({
      title,
      subTitle,
      description,
      category,
      image,
      author: req.user.userId,
    });

    res.status(200).json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// getting latest three blogs
export const getLatestBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 }).limit(3);
    res
      .status(200)
      .json({ success: true, message: "blogs get successfully", blogs });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "blogs get unsuccessfull." + error.message,
      });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { blogid } = req.params;

    const user = await UserModel.findById(req.user.userId);
    const blog = await BlogModel.findById(blogid);

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "blog not found" });
    }

    if (user.role !== "admin" && blog.author !== req.user.userId) {
      return res.status(403).json({ success: false, message: "access denied" });
    }

    if (blog.image) {
      await imagekit.deleteFile(blog.image.id);
    }

    await BlogModel.findByIdAndDelete(blogid);
    await commentModel.deleteMany({ blog_id: blogid });

    return res
      .status(200)
      .json({ success: true, message: "blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "blog not deleted." + error.message });
  }
};

// add comment to the blog
export const addComment = async (req, res) => {
  try {
    const { blogid } = req.params;
    const { content } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    await commentModel.create({
      content,
      blog_id: blogid,
      author: req.user.userId,
    });

    return res
      .status(201)
      .json({ success: true, message: "comment created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "comment not created" + error.message });
  }
};

// get specific blog comments
export const getSpecComment = async (req, res) => {
  try {
    const { blogid } = req.params;

    const blog = await BlogModel.findById(blogid);

    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "blog not found" });
    }

    const comments = await commentModel.find({ blog_id: blogid });

    if (comments.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "comments not found for this blog" });
    }

    return res.status(200).json({
      success: true,
      message: "specifi comments get successfully",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "specific comments not get." + error.message,
    });
  }
};

// delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentid } = req.params;

    const user = await UserModel.findById(req.user.userId);
    const comment = await commentModel.findById(commentid);

    if (user.role !== "admin" && comment.author !== req.user.userId) {
      return res.status(403).json({ success: false, message: "access denied" });
    }

    await commentModel.findByIdAndDelete(commentid);

    return res.status(200).json({ success: true, message: "comment deleted" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "comment not deleted." + error.message,
    });
  }
};
