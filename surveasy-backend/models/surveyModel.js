import mongoose from "mongoose";
import validator from "validator";
import Logger from "../config/logger";
import Response from "./responseModel";

const questionSchema = mongoose.Schema(
  {
    questionId: {
      type: mongoose.SchemaTypes.String,
      required: true,
      validate: [
        (val) => validator.isUUID(val, 4),
        "Question ID is not a valid UUID",
      ],
    },
    questionIndex: {
      type: mongoose.SchemaTypes.Number,
      required: [true, "Question index is required"],
    },
    questionType: {
      type: mongoose.SchemaTypes.String,
      required: true,
      enum: ["mcq", "checkbox", "dropdown", "longText", "shortText"],
    },
    questionTitle: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    questionDescription: {
      type: mongoose.SchemaTypes.String,
    },
    isRequired: {
      type: mongoose.SchemaTypes.Boolean,
      required: true,
    },
    options: [
      {
        id: mongoose.SchemaTypes.String,
        text: mongoose.SchemaTypes.String,
        value: mongoose.SchemaTypes.String,
      },
    ],
  },
  { _id: false }
);

const surveySchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    surveyTitle: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Survey Title is required"],
      maxLength: [60, "Title should be maxium 60 characters"],
    },
    surveyDescription: {
      type: mongoose.SchemaTypes.String,
      maxLength: [140, "Description should be maxium 140 characters"],
      default: "",
    },
    isActive: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    respondentInfo: [
      {
        _id: false,
        info: {
          type: mongoose.SchemaTypes.String,
          required: [true, "Object must have key of 'info'"],
          enum: ["name", "dob", "gender", "email", "phoneNumber"],
        },
        isRequired: {
          type: mongoose.SchemaTypes.Boolean,
          default: false,
        },
      },
    ],
    surveyQuestions: [questionSchema],
  },
  { timestamps: true }
);

surveySchema.pre("remove", function (next) {
  Response.remove({ surveyId: this._id }).exec();
  Logger.info("Responses removed");
  next();
});

const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
