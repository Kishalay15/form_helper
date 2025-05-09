import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//reigistration
router.post("/register", registerUser);

//login
router.post("/login", loginUser);

export default router;
