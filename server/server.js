import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

app.use("/", (req, res) => {
  res.json({ message: "Welcome to my root route. GET comfy!" });
});
