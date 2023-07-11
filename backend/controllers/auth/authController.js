import asyncHandler from "express-async-handler";
import { User } from "../../models/Auth/User.js";
import { authService } from "../../services/auth.service.js";
import { bcryptService } from "../../services/bcrypt.service.js";
import jwt from "jsonwebtoken";
import { Writer } from "../../models/Post/Writer.js";

// @desc    Create New Account
// route    POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { body } = req;

  if (body.password === body.confPassword) {
    const userExists = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
    });

    const token = authService().issue({
      id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ token, user });
  } else {
    res.status(400);
    throw new Error("Passwords don't match");
  }
});

// @desc    Auth user/set token
// route    POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (email && password) {
    const user = await User.findOne({
      where: {
        email,
      }
    });
    console.log(user)
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcryptService().comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    const token = authService().issue({
      id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } else {
    res.status(400);
    throw new Error("Email or Password is Missing");
  }
});

// @desc    Check Is User Has Login
// route    PUT /api/users/check
// @access  Private
export const isAuth = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  console.log(decoded)
  const users = await User.findOne({
    attributes: ["user_id", "email", "password", "name", "role"],
    where: {
      email: decoded.email,
    },
  });

  return res.status(200).json({ message: "User has logged in", users });
});

// @desc    Logout User / Delete set token
// route    POST /api/users/logout
// @access  Public
export const logout = asyncHandler((req, res) => {

  res.clearCookie("jwt");

  res.status(200).json({
    message: "User logged out",
  });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { body } = req;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: {
      email: decoded.email,
    },
  });
  if (user) {
    user.email = body.email || user.email;
    user.name = body.name || user.name;
    user.role = body.role || user.role;
  }
  if (body.password) {
    user.password = body.password;
  }

  const updatedUser = await user.save();

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Profil updated, please login again.",
    updatedUser,
  });
});

// @desc    View user profile
// route    GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const users = await User.findOne({
    attributes: ["user_id", "email", "password", "name", "role"],
    where: {
      email: decoded.email,
    },
    include: {
      model: Writer,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
  });

  return res.status(200).json({ users });
});
