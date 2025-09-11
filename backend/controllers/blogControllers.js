import fs from "fs";
import imagekit from "../configs/imageKit.js";
import BlogModel from "../models/Blog.js";

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

    const image = optimizedImage;

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

export const updateBlog = async (req, res) => {};
