const express = require("express");
const router = express.Router();
const BlogComment = require("./Blog");

router.get("/test", (req, res) => {
  console.log("Rota de teste do blog acessada");
  res.json({ message: "Rota de blog funcionando!" });
});

router.post("/comment", async (req, res) => {
  console.log("Recebendo novo comentário:", req.body);

  try {
    const { nome, email, site, comentario, postId } = req.body;

    const novoComentario = new BlogComment({
      nome,
      email,
      site,
      comentario,
      postId: postId || "post-padrao",
    });

    const comentarioSalvo = await novoComentario.save();
    console.log("Comentário salvo com sucesso:", comentarioSalvo);

    res.status(201).json({
      success: true,
      message: "Comentário salvo com sucesso!",
      data: comentarioSalvo,
    });
  } catch (error) {
    console.error("Erro ao salvar comentário:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao salvar comentário",
      error: error.message,
    });
  }
});

router.get("/comments/:postId", async (req, res) => {
  try {
    const comments = await BlogComment.find({ postId: req.params.postId }).sort(
      { createdAt: -1 }
    );

    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar comentários",
      error: error.message,
    });
  }
});

module.exports = router;
