import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(password.length);

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

    if (existingEmail || existingUsername) {
      return res.status(400).json({
        success: false,
        message: "username or email existing already",
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res
      .status(201)
      .json({ success: true, message: "User created successfully", token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExsist = await UserModel.find({
      $or: [{ username: username }, { email: email }],
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

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res
      .status(200)
      .json({ success: true, message: "User logged successfully", token });
  } catch (error) {
    res
      .status(400)
      .json({ success: true, message: "User login unsuccessfull" });
  }
};
