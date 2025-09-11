import fs from "fs";
import imagekit from "../configs/imageKit.js";
import resourcesModel from "../models/resourceModel.js";

export const addResources = async (req, res) => {
  try {
    const { title, description, link } = JSON.parse(req.body.resources);

    const imageFile = req.file;

    if (!title || !description || !link || !imageFile) {
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

    const preview = optimizedImage;

    await resourcesModel.create({
      title,
      description,
      preview,
      link,
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
