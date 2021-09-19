import express from "express";
import surveyController from "../controllers/surveyController.js";

const router = express.Router();

router.get("/:id", surveyController.getSurveyById);

export default router;
