import Survey from "../models/surveyModel.js";
import createError from "../utils/createError.js";
import logger from "../config/logger.js";

const getAllSurveys = async (req, res, next) => {
  try {
    let userID = req.user._id;
    let surveys = await Survey.find({ userID });
    logger.info(surveys);
    res.json({ surveys });
  } catch (error) {
    next(error);
  }
};

const getSurveyById = async (req, res, next) => {
  try {
    let survey = await Survey.findById(req.params.id);
    if (!survey) {
      throw createError(404, "Survey with this ID does not exist.");
    }

    res.json({ survey });
  } catch (error) {
    next(error);
  }
};

const createSurvey = async (req, res, next) => {
  try {
    let surveyDetails = { ...req.body, userID: req.user._id };
    let newSurvey = await Survey.create(surveyDetails);
    logger.info(newSurvey);
    if (newSurvey) {
      res.status(201).json({ survey: newSurvey });
    }
  } catch (error) {
    next(error);
  }
};

const deleteSurvey = async (req, res, next) => {
  try {
    let survey = await Survey.findByIdAndRemove(req.params.id);

    if (!survey) {
      throw createError(404, "Survey with this ID does not exist.");
    }

    res.json({ message: "Survey Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export default { getAllSurveys, createSurvey, getSurveyById, deleteSurvey };
