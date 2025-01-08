const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/User");

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      tipoPessoa,
      cpfCnpj,
      endereco,
      telefone,
      aceitouTermos,
      autorizouImagem,
    } = req.body;

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
      autorizouImagem,
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
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas" });
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
    res.status(500).send("Erro no servidor");
  }
});

router.put("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPassword,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    res.status(200).json({
      message: "Senha atualizada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    res.status(500).json({
      message: "Erro ao redefinir senha",
    });
  }
});

module.exports = router;
