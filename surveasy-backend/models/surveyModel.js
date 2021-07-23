import mongoose from "mongoose";
import validator from "validator";

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
      { text: mongoose.SchemaTypes.String, value: mongoose.SchemaTypes.String },
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
      required: [true, "Survey Description is required"],
      maxLength: [140, " should be maxium 140 characters"],
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

const Survey = mongoose.model("Survey", surveySchema);

export default Survey;
