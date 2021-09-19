import { Types } from "mongoose";
import Response from "../models/responseModel.js";
import createError from "../utils/createError.js";
import logger from "../config/logger.js";

const getAllResponsesBySurvey = async (req, res, next) => {
  const { surveyId } = req.params;
  logger.info(surveyId);
  try {
    let responses = await Response.find({ surveyId });
    logger.info(responses);
    res.json({ responses });
  } catch (error) {
    next(error);
  }
};

const getResponseById = async (req, res, next) => {
  const { responseId } = req.params;
  try {
    let response = await Response.findById(responseId);
    if (!response) {
      throw createError(404, "Response with this ID does not exist");
    }

    res.json({ response });
  } catch (error) {
    next(error);
  }
};

const getResponsesSummary = async (req, res, next) => {
  const { surveyId } = req.params;
  logger.info(surveyId);
  try {
    let summary = await Response.aggregate([
      { $match: { surveyId: Types.ObjectId(surveyId) } },
      { $project: { answers: 1 } },
      { $unwind: "$answers" },
      { $unwind: "$answers.answer" },
      {
        $group: {
          _id: "$answers.questionId",
          questionTitle: { $first: "$answers.questionTitle" },
          answers: { $push: "$answers" },
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "surveys",
          let: { qID: "$_id" },
          pipeline: [
            { $match: { _id: Types.ObjectId(surveyId) } },
            { $project: { surveyQuestions: 1 } },
            { $unwind: "$surveyQuestions" },
            {
              $match: {
                $expr: { $eq: ["$surveyQuestions.questionId", "$$qID"] },
              },
            },
            {
              $project: {
                _id: 0,
                questionType: "$surveyQuestions.questionType",
                options: "$surveyQuestions.options",
                questionIndex: "$surveyQuestions.questionIndex",
              },
            },
          ],
          as: "questionInfo",
        },
      },
      { $unwind: "$questionInfo" },
      { $sort: { "questionInfo.questionIndex": 1 } },
    ]);

    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

const createResponse = async (req, res, next) => {
  const response = req.body;

  try {
    let newResponse = await Response.create(response);
    if (newResponse) {
      res.status(201).json({ response });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getAllResponsesBySurvey,
  getResponseById,
  createResponse,
  getResponsesSummary,
};
