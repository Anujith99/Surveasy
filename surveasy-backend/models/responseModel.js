import mongoose from "mongoose";
import validator from "validator";

const responseSchema = mongoose.Schema(
  {
    surveyId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Response must include survey id"],
      ref: "Survey",
    },
    respondentInfo: [
      {
        _id: false,
        info: {
          type: mongoose.SchemaTypes.String,
          required: [true, "Object must have a key 'info'"],
          enum: ["name", "dob", "gender", "email", "phoneNumber"],
        },
        value: {
          type: mongoose.SchemaTypes.String,
        },
      },
    ],
    answers: [
      {
        questionId: {
          type: mongoose.SchemaTypes.String,
          required: true,
          validate: [
            (val) => validator.isUUID(val, 4),
            "Question ID is not a valid UUID",
          ],
        },
        questionTitle: {
          type: mongoose.SchemaTypes.String,
          required: true,
        },
        answer: {
          type: mongoose.SchemaTypes.Mixed,
          required: [true, "Answer should be a non-null value"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Response = mongoose.model("Response", responseSchema);

export default Response;
