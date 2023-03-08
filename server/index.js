import express from "express";
import { config } from "dotenv";
import cors from "cors"
config()
const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.CLIENT
}))

app.get("/", (req, res) => {
  res.status(200).json({data: "hello world."})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
