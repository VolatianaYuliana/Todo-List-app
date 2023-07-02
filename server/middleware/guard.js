import { verify } from 'jsonwebtoken';
import { secretKey } from '../controllers/user.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

// Middleware de vérification de l'autorisation JWT
export const authenticateToken = (req, res, next) => {
  // Récupérer le jeton d'autorisation de l'en-tête
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Vérifier si le jeton est présent
  if (!token) {
    return res.status(401).json({ message: 'Pas de jeton d\'autorisation fourni.' });
  }

  // Vérifier la validité du jeton
  verify(token, secretKey , async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Jeton d\'autorisation invalide.' });
    }
    try {
      const checkUser = await prisma.user.findUnique({
        where: {
          id: decoded.userId
        },
        select: {
          id: true,
          email: true
        }
      })
      if (!checkUser) return res.status(403).json({ message: 'Jeton d\'autorisation invalide.' });
      // Ajouter les informations décodées du jeton à l'objet req pour une utilisation ultérieure
      req.user = checkUser;
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription de l\'utilisateur.' });
    }
    // Passer au middleware ou à la route suivante
    next();
  });
};


