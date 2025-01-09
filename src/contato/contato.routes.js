const express = require("express");
const router = express.Router();
const Contato = require("./Contato");

router.post("/submit", async (req, res) => {
  console.log("Recebendo requisição de contato:", req.body);

  try {
    const { nome, email, telefone, assunto, mensagem, autorizouContato } =
      req.body;

    const contato = new Contato({
      nome,
      email,
      telefone,
      assunto,
      mensagem,
      autorizouContato,
    });

    console.log("Tentando salvar contato:", contato);

    const contatoSalvo = await contato.save();
    console.log("Contato salvo com sucesso:", contatoSalvo);

    res.status(201).json({
      message: "Mensagem enviada com sucesso",
      contato: contatoSalvo,
    });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    res.status(500).json({
      message: "Erro ao enviar mensagem",
      error: error.message,
    });
  }
});

module.exports = router;
