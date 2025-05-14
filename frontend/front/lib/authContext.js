// lib/authContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

// Créer le contexte d'authentification
const AuthContext = createContext();

// Fournisseur du contexte d'authentification
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    // Récupérer le token du localStorage
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        // En cas d'erreur, supprimer les données corrompues
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }

    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Appel API de connexion
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // Stocker les données d'authentification
      const { token, user } = data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Mettre à jour l'état
      setUser(user);

      // Rediriger vers le tableau de bord
      router.push("/dashboard");

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Appel API d'inscription
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          ...userData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur d'inscription");
      }

      // Stocker les données d'authentification
      const { token, user } = data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Mettre à jour l'état
      setUser(user);

      // Rediriger vers le tableau de bord
      router.push("/dashboard");

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Réinitialiser l'état
    setUser(null);

    // Rediriger vers la page de connexion
    router.push("/login");
  };

  // Vérification de l'autorisation basée sur le rôle
  const checkRole = (allowedRoles) => {
    if (!user) return false;

    // Si aucun rôle n'est spécifié, autoriser tous les utilisateurs authentifiés
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    // Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
    return allowedRoles.includes(user.role);
  };

  // Exposer les valeurs et fonctions du contexte
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkRole,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
}

// Composant HOC pour protéger les routes qui nécessitent une authentification
export function withAuth(Component, allowedRoles = []) {
  const AuthenticatedComponent = (props) => {
    const { user, loading, isAuthenticated, checkRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Si l'utilisateur n'est pas authentifié et le chargement est terminé, rediriger vers la page de connexion
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }

      // Si l'utilisateur est authentifié mais n'a pas le rôle requis, rediriger vers une page d'accès refusé
      if (isAuthenticated && !checkRole(allowedRoles)) {
        router.push("/access-denied");
      }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
      return <div>Chargement...</div>;
    }

    if (!checkRole(allowedRoles)) {
      return <div>Accès refusé. Vous n'avez pas les droits nécessaires.</div>;
    }

    // Si tout est OK, rendre le composant protégé
    return <Component {...props} />;
  };

  return AuthenticatedComponent;
}
