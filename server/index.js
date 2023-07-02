import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js"
import todosRoutes from "./routes/todos.routes.js"
import { authenticateToken } from "./middleware/guard.js";

config();
const app = express();
const port = process.env.PORT;
const prisma = new PrismaClient();
app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(bodyParser.json());
app.use("/auth", usersRoutes)



// je veux mettre un middleware ici pour vérifier si les requêtes ont un header authorization avant d'accéder à cette route
app.use("/todos",authenticateToken, todosRoutes)

app.get("/", async (req, res) => {
  try {
    await prisma.todo.createMany({
      data: [
        {
          name: "tomate",
        },
        {
          name: "orange juice",
        },
        {
          name: "Milk",
        },
        {
          name: "ice cream",
        },
        {
          name: "eggs",
        },
        {
          name: "meat",
        },
      ],
    });
    return res.status(200).json({ data: "hello world." });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.listen(port, async () => {
  console.log(
    `
    If first time to use this,call the routes:
     http://localhost:${port}/
    to populate the database
    `
  );
});

export default app
