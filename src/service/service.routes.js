const express = require("express");
const router = express.Router();
const ServiceRequest = require("./Service");

router.post("/request", async (req, res) => {
  try {
    const {
      nome,
      telefone,
      email,
      planoInteresse,
      tipoServico,
      tipoPagamento,
      prazo,
      orcamento,
      mensagem,
      autorizouContato,
    } = req.body;

    const serviceRequest = new ServiceRequest({
      nome,
      telefone,
      email,
      planoInteresse,
      tipoServico,
      tipoPagamento,
      prazo,
      orcamento,
      mensagem,
      autorizouContato,
    });

    await serviceRequest.save();

    res.status(201).json({
      message: "Solicitação enviada com sucesso",
      serviceRequest,
    });
  } catch (error) {
    console.error("Erro ao criar solicitação:", error);
    res.status(500).json({
      message: "Erro ao enviar solicitação",
      error: error.message,
    });
  }
});

module.exports = router;
