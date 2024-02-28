import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { createError } from "../utills/error.js";
import validator from "validator"

export const register = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const spaceRegex = /\s/

    if(!username || spaceRegex.test(username)){
        return next(createError(400, "Please provide valid username"))  
    }

    if(!email || spaceRegex.test(email) || !validator.isEmail(email)){
        return next(createError(400, "Please provide valid email"))  
    }
    if(!password || spaceRegex.test(password)){
        return next(createError(400, "Please provide valid password"))  
    }

    const hashed = bcrypt.hashSync(password, 10);
    
    const newUser = await new User({username, email, password: hashed}).save()
    res.status(201).json({success: true, message: "User created successfully", newUser})

  } catch (err) {
    next(err);
  }
};
