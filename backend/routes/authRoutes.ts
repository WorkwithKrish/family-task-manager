import express from "express";
import { signup, login } from "../controllers/authController";

// import from "../../"
const router = express.Router();
router.post("/signup", signup);

router.post("/login", login); // POST to /login for user login

export default router;
