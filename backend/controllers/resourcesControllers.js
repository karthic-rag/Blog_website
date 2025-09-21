import fs from "fs";
import imagekit from "../configs/imageKit.js";
import resourcesModel from "../models/resourceModel.js";
import UserModel from "../models/UserModel.js";

export const addResources = async (req, res) => {
  try {
    const { title, description, link, category } = JSON.parse(
      req.body.resources
    );

    const imageFile = req.file;

    if (!title || !description || !link || !imageFile || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    //upload Image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/resources",
    });

    // optimize through imagekit URL transformation
    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [{ quality: "auto" }, { format: "webp" }],
    });

    const preview = { url: optimizedImage, id: response.fileId };

    await resourcesModel.create({
      title,
      description,
      preview,
      link,
      category,
      author: req.user.userId,
    });

    res
      .status(200)
      .json({ success: true, message: "Resources added successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "resources not added." + error.message,
    });
  }
};

// delete resource
export const deleteRes = async (req, res) => {
  try {
    const { resid } = req.params;

    const user = await UserModel.findById(req.user.userId);
    const resource = await resourcesModel.findById(resid);

    if (!resource) {
      return res
        .status(400)
        .json({ success: false, message: "resource not found" });
    }

    if (user.role !== "admin" && blog.author !== req.user.userId) {
      return res.status(403).json({ success: false, message: "access denied" });
    }

    if (resource.preview) {
      await imagekit.deleteFile(resource.preview.id);
    }

    await resourcesModel.findByIdAndDelete(resid);

    return res
      .status(200)
      .json({ success: true, message: "resource deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "resource not deleted." + error.message,
    });
  }
};

// getting latest three resources
export const getLatestBlog = async (req, res) => {
  try {
    const resources = await resourcesModel
      .find()
      .sort({ createdAt: -1 })
      .limit(3);
    res
      .status(200)
      .json({
        success: true,
        message: "resources get successfully",
        resources,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "resources get unsuccessfull." + error.message,
    });
  }
};
