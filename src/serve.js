const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "Api NettCorpSolutions 🚀" });
});

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// Rotas
app.use("/api/auth", require("./auth/auth"));
app.use("/api/users", require("./user/user.routes"));

app.use(
  cors({
    origin: "http://localhost:3000", // URL do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
