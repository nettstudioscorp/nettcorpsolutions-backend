const mongoose = require("mongoose");

const contatoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    assunto: {
      type: String,
      required: true,
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
      enum: ["pendente", "respondido", "finalizado"],
      default: "pendente",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "contatos",
  }
);

module.exports = mongoose.model("contato", contatoSchema);
