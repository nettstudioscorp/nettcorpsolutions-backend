const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Api NettCorpSolutions 🚀" });
});

const serviceRoutes = require("./service/service.routes");
app.use("/api/services", serviceRoutes);

const contatoRoutes = require("./contato/contato.routes");
app.use("/api/contato", contatoRoutes);

// ... código existente ...
const faleConoscoRoutes = require("./faleconosco/faleConosco.routes");
app.use("/api/faleconosco", faleConoscoRoutes);
// ... resto do código ...

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "nettcorpdatabase", // Força o uso deste nome de banco de dados
  })
  .then(() => {
    console.log("Conectado ao MongoDB - Database: nettcorpdatabase");
    console.log("URI:", process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });
const authRoutes = require("./auth/auth");
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
