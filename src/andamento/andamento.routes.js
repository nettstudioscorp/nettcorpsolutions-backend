const express = require("express");
const router = express.Router();
const Andamento = require("./Andamento");

router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, ...otherData } = req.body;
    const andamento = new Andamento({
      userName,
      userEmail,
      ...otherData,
    });
    await andamento.save();
    res
      .status(201)
      .json({ message: "Solicitação de andamento criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar solicitação de andamento:", error);
    res.status(500).json({ message: "Erro ao criar solicitação de andamento" });
  }
});

module.exports = router;
