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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my root route. GET comfy!" });
});

app.post("/guestbook", async (req, res) => {
  const newGuest = req.body.formValues;
  console.log(newGuest);

  const query = await db.query(
    `INSERT INTO guestbook (name, comment) VALUES ($1, $2)`,
    [newGuest.name, newGuest.comment]
  );
  res.json({ status: "success", values: newGuest });
});

app.get("/guestbook", async (req, res) => {
  const guests = await db.query(`SELECT id, name, comment FROM guestbook`);
  res.json(guests.rows);
});
