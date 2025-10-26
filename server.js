import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let players = {};
let idAnterior = 0;

app.get("/players", (req, res) => {
  res.status(200).json(players);
});

app.post("/players", (req, res) => {
  const nome = req.body.name;

  if (players[nome]) {
    res.status(400).json({ message: "Esse player já existe!" });
    return;
  }

  const id = ++idAnterior;
  const player = { x: 20, y: 20, size: 10, id: id };
  players[nome] = player;

  res.status(201).json({ message: "Player conectado!", player: player });
});

app.put("/players/:id", (req, res) => {
  const idProcurado = req.params.id;

  for (const playerName in players) {
    const player = players[playerName];

    if (player.id == idProcurado) {
      const { x, y, size } = req.body;
      player.x = x;
      player.y = y;
      player.size = size;
      res.status(200).json({ message: "Player alterado!" });
      return;
    }
  }

  res.status(404).json({ message: "Player não encontrado!" });
});

app.delete("/players/:id", (req, res) => {
  const idProcurado = req.params.id;

  for (const playerName in players) {
    if (players[playerName].id == idProcurado) {
      delete players[playerName];
      res.status(200).json({ message: "Player desconectado!" });
      return;
    }
  }

  res.status(404).json({ message: "Player não encontrado!" });
});

export default app;
