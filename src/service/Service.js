const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    planoInteresse: {
      type: String,
      required: true,
    },
    tipoServico: {
      type: String,
      required: true,
    },
    tipoPagamento: {
      type: String,
      required: true,
    },
    prazo: {
      type: String,
      required: true,
    },
    orcamento: {
      type: String,
    },
    mensagem: {
      type: String,
      required: true,
    },
    autorizouContato: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      enum: ["pendente", "em_analise", "aprovado", "rejeitado"],
      default: "pendente",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "services",
  }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
