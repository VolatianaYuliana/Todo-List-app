import { Router } from "express";
import { createTodo, deleteTodo, getTodo, getTodos, getUser, searchTodos, updateTodo } from "../controllers/todo.js";

const router = Router()

// Route pour récupérer toutes les tâches
router.get("/tasks", getTodos);

  // Route pour récupérer une tâche spécifique
  router.get("/tasks/:id", getTodo);

  // Route pour ajouter une nouvelle tâche
  router.post("/tasks", createTodo );

  // Route pour mettre à jour une tâche existante
  router.put("/tasks/:id", updateTodo);

  // Route pour supprimer une tâche existante
  router.delete("/tasks/:id", deleteTodo);

//  Route pour rechercher des tâches
router.get("/search", searchTodos);

//route pour obtenir les info utilisateur
router.get("/user", getUser)

  export default router
