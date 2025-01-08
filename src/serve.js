const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Api NettCorpSolutions 🚀" });
});

console.log(
  "Tentando conectar ao MongoDB com URI:",
  process.env.MONGODB_URI.replace(/:[^:/@]+@/, ":****@")
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
    console.log("Nome do banco de dados:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:");
    console.error("Detalhes do erro:", err);
    process.exit(1);
  });

app.use("/api/auth", require("./auth/auth"));
app.use("/api/users", require("./user/user.routes"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
