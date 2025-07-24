import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 4000;

app.use(cors());

const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

// GET /fitMes => retorna lista de restaurantes
app.get("/fitMes", (req, res) => {
  const response = {
    count: data.fitMes.length,
    edges: data.fitMes.map((r) => ({ node: r }))
  };
  res.json(response);
});

// GET /fitMe/:id => retorna restaurante por ID
app.get("/fitMe/:id", (req, res) => {
  const restaurant = data.fitMes.find((r) => r.objectId === req.params.id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ error: "Restaurante não encontrado" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor REST rodando em http://localhost:${PORT}`);
});
