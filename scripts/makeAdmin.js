// scripts/makeAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/UserModel.js";
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: "admin@example.com" });
  if (user) {
    user.isAdmin = true;
    await user.save();
    console.log("Made admin:", user.email);
  } else {
    console.log("User not found");
  }
  process.exit();
}
run();
