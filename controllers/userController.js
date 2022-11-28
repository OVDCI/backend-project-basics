import userModel from "../models/userModel.js";

import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
      console.log(req.query.test);
      const users = await userModel.find();
      res.json(users);
    } catch (error) {
      res.send(error);
    }
  };

  

  export const deleteUser = async (req, res) => {
    try{
      const id=req.params.id;
      await userModel.findByIdAndDelete(id);
      console.log(req.params.id);
      res.status(200).json({msg:"User deleted successfully"})
   }catch(err){
      console.log("error while deleting user",err);
   }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};


export const createUser = async (req, res, next) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password} = req.body;
    //Check if user already exists
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password
    });

    //hash the password for the new user
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    //Create a payload
    const payload = {
      id: newUser._id,
      name: newUser.firstName,
    };

    //Create a token and send
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ msg: "User created successfully", token });
    });
  } catch (e) {
    next(e);
  }
};
  
export const userLogin = async (req, res) => {
  

  try {
    const { email, password } = req.body;
    
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not exists!" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password incorrect!" });
    }

    //Create a payload
    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };

    //Create a token and send
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ msg: "User successfully logged in", token });
    });
  } catch (error) {}
};