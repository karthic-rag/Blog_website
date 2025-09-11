import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenGeneration.js";
import setCookie from "../utils/setCookie.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
import BlogModel from "../models/Blog.js";
import resourcesModel from "../models/resourceModel.js";

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    //validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter valid email" });
    }

    //validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password should atleast contains six characters",
      });
    }

    //check existing username and email
    const existingUsername = await UserModel.findOne({ username: username });
    const existingEmail = await UserModel.findOne({ email: email });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "username existing already",
      });
    }
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "email existing already",
      });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id, user.email);
    setCookie(res, "token", token);

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "user not created." + error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Fields" });
    }

    const userExsist = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!userExsist) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const decodedPassword = await bcrypt.compare(password, userExsist.password);
    if (!decodedPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = generateToken(userExsist._id, userExsist.email);
    setCookie(res, "token", token);

    return res
      .status(200)
      .json({ success: true, message: "User logged successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User login unsuccessfull." + error.message,
    });
  }
};

// User Logout
export const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User not logged out." + error.message,
    });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { name, username } = req.body;
    const profilePic = req.file;

    const updateFields = {};

    // user provided a new name
    if (name) {
      updateFields.name = name;
    }

    //  user provided a new username
    if (username) {
      const existingUsername = await UserModel.findOne({ username });
      if (
        existingUsername &&
        existingUsername._id.toString() !== req.user.userId
      ) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
      updateFields.username = username;
    }

    // user uploaded a new profile picture
    if (profilePic) {
      const fileBuffer = fs.readFileSync(profilePic.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: profilePic.originalname,
        folder: "/profile",
      });

      const optimizedImage = imagekit.url({
        path: response.filePath,
        transformation: [{ quality: "auto" }, { format: "webp" }],
      });

      updateFields.profile = { url: optimizedImage, id: response.fileId };
    }

    // If nothing was provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update",
      });
    }
    await UserModel.findByIdAndUpdate(req.user.userId, {
      $set: updateFields,
    });

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User profile not updated. " + error.message,
    });
  }
};

export const getAllblogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find({ status: "approved" });

    if (allBlogs.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "blogs not found" });
    }

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
    const allResources = await resourcesModel.find({ status: "approved" });

    if (allResources.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "resources not found" });
    }

    return res.status(200).json({
      success: true,
      message: "all resources get successfully",
      allResources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in get all resources" + error.message,
    });
  }
};
