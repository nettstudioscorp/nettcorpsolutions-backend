const mongoose = require("mongoose");

const faleConoscoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tipoSolicitacao: {
      type: String,
      required: true,
      enum: [
        "alteracao_nome",
        "alteracao_email",
        "alteracao_senha",
        "duvida",
        "outro",
      ],
    },
    detalhes: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendente", "em_analise", "resolvido"],
      default: "pendente",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "faleconosco",
  }
);

module.exports = mongoose.model("FaleConosco", faleConoscoSchema);
