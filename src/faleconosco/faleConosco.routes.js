const express = require("express");
const router = express.Router();
const FaleConosco = require("./FaleConosco");

router.post("/submit", async (req, res) => {
  console.log("Recebendo solicitação:", req.body);

  try {
    const { nome, email, tipoSolicitacao, detalhes } = req.body;

    const solicitacao = new FaleConosco({
      nome,
      email,
      tipoSolicitacao,
      detalhes,
    });

    await solicitacao.save();

    res.status(201).json({
      message: "Solicitação enviada com sucesso",
      solicitacao,
    });
  } catch (error) {
    console.error("Erro ao salvar solicitação:", error);
    res.status(500).json({
      message: "Erro ao enviar solicitação",
      error: error.message,
    });
  }
});

module.exports = router;
