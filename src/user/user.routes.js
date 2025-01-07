const router = require("express").Router();
const User = require("./User");

// Rota para listar usuários (exemplo)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).send("Erro ao buscar usuários");
  }
});

module.exports = router;
