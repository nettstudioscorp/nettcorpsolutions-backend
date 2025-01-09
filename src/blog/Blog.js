const mongoose = require("mongoose");

const blogCommentSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    site: {
      type: String,
      required: false,
    },
    comentario: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "blog",
  }
);

module.exports = mongoose.model("BlogComment", blogCommentSchema);
