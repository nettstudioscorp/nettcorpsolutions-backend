const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tipoPessoa: {
      type: String,
      enum: ["fisica", "juridica"],
      required: true,
    },
    cpfCnpj: {
      type: String,
      required: true,
    },
    endereco: {
      cep: String,
      logradouro: String,
      numero: String,
      bairro: String,
      cidade: String,
      estado: String,
      nome: String,
    },
    telefone: {
      type: String,
      required: true,
    },
    aceitouTermos: {
      type: Boolean,
      default: false,
    },
    autorizouImagem: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema, "users");
