import { Types } from "mongoose";
import Response from "../models/responseModel.js";
import createError from "../utils/createError.js";
import logger from "../config/logger.js";

import excel from "exceljs";
import { getDate, getHeaders, getRows } from "../utils/spreadsheetUtils.js";

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
    let count = await Response.countDocuments({
      surveyId: Types.ObjectId(surveyId),
    });
    let summary = await Response.aggregate([
      { $match: { surveyId: Types.ObjectId(surveyId) } }, //Get All Responses for a particular Survey ID
      { $project: { answers: 1 } }, // Select the answers key from the response
      { $unwind: "$answers" }, //Separate document for each answer
      { $unwind: "$answers.answer" }, //If answer is an array (For checkbox type), we create separate document for each selection
      {
        //Group all answers by questionId
        $group: {
          _id: "$answers.questionId",
          questionTitle: { $first: "$answers.questionTitle" },
          answers: { $push: "$answers" },
        },
      },
      {
        $lookup: {
          //Get the questionInfo from the survey collection
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
      { $unwind: "$questionInfo" }, //Convert questionInfo to an object
      { $sort: { "questionInfo.questionIndex": 1 } }, //Sort the final results based on the question Index
    ]);

    res.json({ totalResponses: count, summary });
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

const getResponsesSheet = async (req, res, next) => {
  const { surveyId } = req.params;
  logger.info(surveyId);
  try {
    let responses = await Response.find({ surveyId });
    if (responses.length === 0) {
      throw createError(404, "There are no responses for this survey");
    }
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Responses");
    let headers = getHeaders(responses[0]);
    let rows = getRows(responses);
    worksheet.columns = headers;
    worksheet.addRows(rows);

    worksheet.views = [{ state: "frozen", xSplit: 0, ySplit: 1 }];
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + `Responses for ${getDate()}.xlsx`
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllResponsesBySurvey,
  getResponseById,
  createResponse,
  getResponsesSummary,
  getResponsesSheet,
};
