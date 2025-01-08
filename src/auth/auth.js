const router = require("express").Router();
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

module.exports = router;
