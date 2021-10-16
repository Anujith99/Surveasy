import express from "express";
import userController from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.get("/currentUser", protect, userController.getUser);
router.put("/profile", protect, userController.updateUser);

export default router;
