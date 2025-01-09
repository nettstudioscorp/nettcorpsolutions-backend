const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    console.error("Erro de autenticação:", error);
    res.status(401).json({ message: "Token inválido" });
  }
};

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
            telefone: user.telefone,
          },
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

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
      autorizouArmazenamentoDeDados,
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
            telefone: user.telefone,
          },
        });
      }
    );
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({
      message: "Erro ao criar usuário",
      error: error.message,
    });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("ID do usuário:", userId);
    console.log("Dados recebidos:", req.body);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const { name, email, telefone, password } = req.body;

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

    console.log("Usuário atualizado:", userResponse);

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

router.put("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "Email e nova senha são obrigatórios",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
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
