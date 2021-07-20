import express from "express";
import surveyController from "../controllers/surveyController.js";
let router = express.Router();

router.get("/", surveyController.getAllSurveys);
router.get("/:id", surveyController.getSurveyById);
router.post("/", surveyController.createSurvey);
router.delete("/:id", surveyController.deleteSurvey);

export default router;
