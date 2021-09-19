import express from "express";
import responseController from "../controllers/responseController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "This is responses base route" });
});

router.get("/:responseId", responseController.getResponseById);
router.get("/summary/:surveyId", responseController.getResponsesSummary);
router.get("/survey/:surveyId", responseController.getAllResponsesBySurvey);
router.post("/", responseController.createResponse);

export default router;
