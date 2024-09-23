import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pendulum } from "./pendulum/pendulum";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const pendulum = Pendulum.getInstance();

app.use(express.json(), cors());

app.post("/configure", (req, res) => {
  pendulum.configure(req.body);
  res.sendStatus(200);
});

app.get("/status", (req, res) => {
  res.json(pendulum.getStatus());
});

app.listen(port, () => {
  console.info(`Server running on http://localhost:${port}`);
});
