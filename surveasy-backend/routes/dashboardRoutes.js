import express from "express";
import userRoutes from "./userRoutes.js";
import surveyRoutes from "./surveyRoutes.js";
import { protect } from "../middlewares/authMiddleware.js";
import logger from "../config/logger.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  //   logger.info(req.user);
  res.json({ message: "This is dashboard route" });
});

router.use("/users", userRoutes);
router.use("/surveys", protect, surveyRoutes);

export default router;
