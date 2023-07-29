import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/Auth/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
	console.log(token)
  const secret = process.env.JWT_SECRET;

  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
console.log('ok')
      req.user = await User.findOne({
        where: {
          email: decoded.email,
        },
        attributes: ["user_id", "email"],
      });
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. no token");
  }
});
