import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
export const secretKey = 'your_secret_key'; // Remplacez 'your_secret_key' par votre clé secrète pour la génération des jetons JWT

export const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
    }

    // Vérifier le mot de passe (par exemple, longueur minimale, caractères requis, etc.)
    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères.' });
    }

    // Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec les données vérifiées
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    // Générer un jeton JWT pour l'utilisateur
    const token = jwt.sign({ userId: newUser.id }, secretKey );

    return res.status(201).json({ message: 'Utilisateur enregistré avec succès.', token });
  } catch (e) {
    // Gérer les erreurs ici
    console.error(e);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription de l\'utilisateur.' });
  }
};

export const signinController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier l'email et récupérer les informations de l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'L\'e-mail ou le mot de passe est incorrect.' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'L\'e-mail ou le mot de passe est incorrect.' });
    }

    // Générer un jeton JWT pour l'utilisateur
    const token = jwt.sign({ userId: user.id }, secretKey);

    return res.status(200).json({ message: 'Authentification réussie.', token });
  } catch (e) {
    // Gérer les erreurs ici
    console.error(e);
    return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'authentification.' });
  }
};

