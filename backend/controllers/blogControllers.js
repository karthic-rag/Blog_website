import fs from "fs";
import imagekit from "../configs/imageKit.js";
import BlogModel from "../models/Blog.js";
import UserModel from "../models/UserModel.js";

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

    return res
      .status(200)
      .json({ success: true, message: "blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "blog not deleted." + error.message });
  }
};
