import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { createError } from "../utills/error.js";
import validator from "validator";

//REISTRATION CONTROLLER
export const register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const spaceRegex = /\s/;

    if (!username || spaceRegex.test(username)) {
      return next(createError(400, "Please provide valid username"));
    }

    if (!email || spaceRegex.test(email) || !validator.isEmail(email)) {
      return next(createError(400, "Please provide valid email"));
    }
    if (!password || spaceRegex.test(password)) {
      return next(createError(400, "Please provide valid password"));
    }

    const hashed = bcrypt.hashSync(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashed,
    }).save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully", newUser });
  } catch (err) {
    next(err);
  }
};

//LOGIN CONTROLLER
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User doesnot exist"));

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return next(createError(401, "Wrong Credentials"));

    const token = JWT.sign(
      { id: user._id, username: user.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    const { password, ...others } = user._doc;

    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "User Login Successfully", others });
  } catch (err) {
    next(err);
  }
};

//LOGOUT CONTROLLER

