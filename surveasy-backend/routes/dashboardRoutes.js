import express from "express";
import userRoutes from "./userRoutes.js";
import surveyRoutes from "./surveyRoutes.js";
import { protect } from "../middlewares/authMiddleware.js";
import responseController from "../controllers/responseController.js";
import logger from "../config/logger.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  //   logger.info(req.user);
  res.json({ message: "This is dashboard route" });
});

router.use("/users", userRoutes);
router.use("/surveys", protect, surveyRoutes);
router.get(
  "/summary/:surveyId",
  protect,
  responseController.getResponsesSummary
);
router.get("/spreadsheet/:surveyId", responseController.getResponsesSheet);

export default router;
