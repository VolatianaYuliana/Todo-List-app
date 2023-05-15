import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
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

// Route pour récupérer toutes les tâches
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.todo.findMany();
    return res.status(200).json(tasks);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Route pour récupérer une tâche spécifique
app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Route pour ajouter une nouvelle tâche
app.post("/tasks", async (req, res) => {
  const { name } = req.body;
  try {
    const task = await prisma.todo.create({
      data: {
        name,
      },
    });
    return res.status(201).json(task);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Route pour mettre à jour une tâche existante
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  try {
    const task = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        name,
        completed,
      },
    });
    return res.status(200).json(task);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Route pour supprimer une tâche existante
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Delete successfully" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

//  Route pour rechercher des tâches
app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const results = await prisma.todo.findMany({
      where: {
        name: {
          contains: `${q}`,
        },
      },
    });
    return res.status(200).json({ data: results });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

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
