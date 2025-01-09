const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Erro de autenticação:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};

router.put("/update", authMiddleware, async (req, res) => {
  console.log("Recebendo requisição de atualização:", req.body);

  try {
    const userId = req.userId;
    const { name, email, telefone, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (telefone) user.telefone = telefone;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    console.log("Usuário atualizado com sucesso:", userResponse);

    res.json({
      message: "Dados atualizados com sucesso",
      user: userResponse,
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({
      message: "Erro ao atualizar dados",
      error: error.message,
    });
  }
});

module.exports = router;
