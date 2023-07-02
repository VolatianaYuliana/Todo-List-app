import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getTodos = async (req, res) => {
  const user = req.user
    try {
      const tasks = await prisma.todo.findMany({
        where: {
            user_id: user.id
        }
      });
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

export const getTodo =  async (req, res) => {
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
  }

  export const createTodo = async (req, res) => {
    const { name } = req.body;
    const user = req.user
    try {
      const task = await prisma.todo.create({
        data: {
          name,
          user_id: user.id
        },
      });
      return res.status(201).json(task);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e });
    }
  }

  export const updateTodo = async (req, res) => {
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
  }

  export const deleteTodo =  async (req, res) => {
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
  }

  export const searchTodos = async (req, res) => {
    const { q } = req.query;
    const user = req.user
    try {
      const results = await prisma.todo.findMany({
        where: {
          user_id: user.id,
          name: {
            contains: `${q}`,
          },
        },
      });
      return res.status(200).json({ data: results });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  }

export const getUser = async (req, res) => {
  const user = req.user
  try {
    const results = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true
      }
    })
    if (!user) return res.status(400).json({
      message: 'Jeton d\'autorisation invalide.'
    })
    return res.status(200).json({ data: results });
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e });
  }
}
