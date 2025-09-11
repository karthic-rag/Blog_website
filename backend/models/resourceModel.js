import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    preview: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "apporved", "rejected"],
      default: "pending",
    },

    category: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const resourcesModel = mongoose.model("resources", resourceSchema);

export default resourcesModel;
