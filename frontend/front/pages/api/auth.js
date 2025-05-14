import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

// Clé secrète pour signer les jetons JWT (à placer dans .env dans une vraie application)
const JWT_SECRET = "votre_clé_secrète_très_sécurisée";



let users = [
  {
    id: 1,
    email: "admin@exemple.fr",
    password: "$2b$10$X7RvZ0sRXVuL0/KpUFjGqOjJ2KdYY5zZj4nd9zPXL2zxnxJUO6LAm", // 'admin123'
    role: "admin",
    name: "Admin Test",
  },
  {
    id: 2,
    email: "analyste@exemple.fr",
    password: "$2b$10$QsZCH1bShWbmPl1NLS1QWuK8o4zLBGLLfaA74QIeQKIWyVQQgVHSK", // 'analyste123'
    role: "analyste",
    name: "Analyste Test",
  },
  {
    id: 3,
    email: "parent@exemple.fr",
    password: "$2b$10$zL6zJMd4Qe76QzKXs.RhCuHMjEtsd/tLNxwGOAUKjHXcLVfUlZdeK", // 'parent123'
    role: "parent",
    name: "Parent Test",
  },
  {
    id: 4,
    email: "secretaire@exemple.fr",
    password: "$2b$10$zH5CqT90oz/SogVA27.zl.zQs0Z4cRSS1zOW0Mds1vN0.8D0t/NhO", // 'secretaire123'
    role: "secretaire",
    name: "Secrétaire Test",
  },
];

export default async function handler(req, res) {
  // Récupérer les informations de connexion/inscription
  const { method } = req;

  if (method === "POST") {
    try {
      const { action, email, password, role, name } = req.body;

      // Inscription
      if (action === "register") {
        // Vérifier si l'utilisateur existe déjà
        const userExists = users.find((u) => u.email === email);
        if (userExists) {
          return res.status(400).json({
            success: false,
            message: "Cet email est déjà utilisé",
          });
        }

        // Hacher le mot de passe
        const hashedPassword = await hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = {
          id: users.length + 1,
          email,
          password: hashedPassword,
          role,
          name: name || email.split("@")[0],
        };

        // Ajouter l'utilisateur à la "base de données"
        users.push(newUser);

        // Générer un JWT
        const token = jwt.sign(
          { id: newUser.id, email: newUser.email, role: newUser.role },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        // Retourner les informations (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json({
          success: true,
          user: userWithoutPassword,
          token,
        });
      }

      // Connexion
      if (action === "login") {
        // Trouver l'utilisateur
        const user = users.find((u) => u.email === email);

        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Email ou mot de passe incorrect",
          });
        }

        // Vérifier le mot de passe
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
          return res.status(400).json({
            success: false,
            message: "Email ou mot de passe incorrect",
          });
        }

        // Générer un JWT
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: "24h" }
        );

        // Retourner les informations (sans le mot de passe)
        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json({
          success: true,
          user: userWithoutPassword,
          token,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Action non reconnue",
      });
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: `Méthode ${method} non autorisée`,
    });
  }
}
