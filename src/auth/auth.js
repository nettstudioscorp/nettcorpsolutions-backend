const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/User");

router.post("/register", async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);

    const {
      name,
      email,
      password,
      tipoPessoa,
      cpfCnpj,
      endereco,
      telefone,
      aceitouTermos,
      autorizouArmazenamentoDeDados,
    } = req.body;

    if (!name || !email || !password || !tipoPessoa || !cpfCnpj || !telefone) {
      console.log("Campos faltando:", {
        name,
        email,
        password,
        tipoPessoa,
        cpfCnpj,
        telefone,
      });
      return res.status(400).json({
        message: "Todos os campos obrigatórios devem ser preenchidos",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    user = new User({
      name,
      email,
      password,
      tipoPessoa,
      cpfCnpj,
      endereco,
      telefone,
      aceitouTermos,
      autorizouArmazenamentoDeDados,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            tipoPessoa: user.tipoPessoa,
            cpfCnpj: user.cpfCnpj,
            endereco: user.endereco,
            telefone: user.telefone,
          },
        });
      }
    );
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({
      message: "Erro ao criar usuário",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email não cadastrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.put("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    console.log("Dados recebidos:", { email, newPassword: "***" });

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email e nova senha são obrigatórios",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "A senha deve ter pelo menos 6 caracteres",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Senha atualizada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({
      message: "Erro ao redefinir senha",
      error: error.message,
    });
  }
});

module.exports = router;
