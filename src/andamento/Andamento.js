const mongoose = require("mongoose");

const andamentoSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  contactMethod: String,
  taskType: String,
  reportFormat: String,
  reportDate: Date,
  urgencyLevel: String,
  newDeadline: Date,
  subscriptionChange: String,
  refundRequest: Boolean,
  refundDetails: String,
  additionalInfo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Andamento", andamentoSchema, "andamento");
