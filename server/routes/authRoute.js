// server/routes/authRoute.js
import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google  { idToken }
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload(); // contains email, sub (google id), name, picture, etc.

    const googleId = payload.sub;
    const email = payload.email;
    const fullName = payload.name;

    // Find or create user
    let user = await User.findOne({ googleId });
    if (!user) {
      // create new user (default not admin)
      user = await User.create({
        googleId,
        email,
        fullName,
        grade: req.body.grade || undefined, // optional
      });
    } else {
      // optional: update name/email if changed
      user.email = email;
      user.fullName = fullName;
      await user.save();
    }

    // create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ token, user: { _id: user._id, email: user.email, fullName: user.fullName, grade: user.grade, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/verify  -> header Authorization: Bearer <token>
router.post("/verify", async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-__v");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user: { _id: user._id, email: user.email, fullName: user.fullName, grade: user.grade, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
