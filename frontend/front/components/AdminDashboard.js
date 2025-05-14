// components/AdminDashboard.js
import { useState } from "react";
import { useAuth } from "../lib/authContext";
import { Users, Settings, FileText, User } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("users");

  // Les sections disponibles pour un administrateur
  const sections = [
    {
      id: "users",
      name: "Gestion des utilisateurs",
      icon: <Users size={20} />,
    },
    {
      id: "settings",
      name: "Paramètres système",
      icon: <Settings size={20} />,
    },
    { id: "reports", name: "Rapports", icon: <FileText size={20} /> },
    { id: "profile", name: "Mon profil", icon: <User size={20} /> },
  ];

  // Données factices des utilisateurs (simulées)
  const users = [
    {
      id: 1,
      name: "Martin Dupont",
      email: "martin@exemple.fr",
      role: "admin",
      active: true,
    },
    {
      id: 2,
      name: "Sophie Renaud",
      email: "sophie@exemple.fr",
      role: "analyste",
      active: true,
    },
    {
      id: 3,
      name: "Philippe Moreau",
      email: "philippe@exemple.fr",
      role: "parent",
      active: false,
    },
    {
      id: 4,
      name: "Céline Dion",
      email: "celine@exemple.fr",
      role: "secretaire",
      active: true,
    },
    {
      id: 5,
      name: "Jean Martin",
      email: "jean@exemple.fr",
      role: "parent",
      active: true,
    },
  ];

  // Rendu de la section active
  const renderSection = () => {
    switch (activeSection) {
      case "users":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Gestion des utilisateurs
              </h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                + Nouvel utilisateur
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rôle
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Statut
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "analyste"
                              ? "bg-blue-100 text-blue-800"
                              : user.role === "parent"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            user.active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          Modifier
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Paramètres système</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Sécurité</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Authentification à deux facteurs
                      </p>
                      <p className="text-xs text-gray-500">
                        Renforce la sécurité des comptes utilisateurs
                      </p>
                    </div>
                    <button className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-md text-sm">
                      Activer
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Durée de session
                      </p>
                      <p className="text-xs text-gray-500">
                        Délai avant déconnexion automatique
                      </p>
                    </div>
                    <select className="border-gray-300 rounded-md text-sm">
                      <option>30 minutes</option>
                      <option>1 heure</option>
                      <option>4 heures</option>
                      <option>8 heures</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Emails pour nouvelles inscriptions
                      </p>
                      <p className="text-xs text-gray-500">
                        Notification lors de l'inscription d'un nouvel
                        utilisateur
                      </p>
                    </div>
                    <button className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                      Activé
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Rapports hebdomadaires
                      </p>
                      <p className="text-xs text-gray-500">
                        Envoi automatique de rapports d'activité
                      </p>
                    </div>
                    <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                      Désactivé
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "reports":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Rapports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Activité utilisateurs</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Statistiques de connexion des utilisateurs
                </p>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm">
                  Générer le rapport
                </button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Audit des accès</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Historique des accès aux données sensibles
                </p>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm">
                  Générer le rapport
                </button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Utilisation par rôle</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Analyse des activités par type d'utilisateur
                </p>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm">
                  Générer le rapport
                </button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Erreurs système</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Suivi des problèmes et exceptions
                </p>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm">
                  Générer le rapport
                </button>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">Mon profil</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <User size={48} className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">
                    {user.name || "Admin"}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full inline-block mt-1">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={user.name || "Admin"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={user.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Laissez vide pour conserver le mot de passe actuel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-white font-bold">Administration</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-white mr-4">{user.email}</div>
              <button
                onClick={logout}
                className="bg-indigo-700 p-2 rounded-md text-indigo-200 hover:text-white"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-64 mb-6 md:mb-0 md:mr-6">
            <div className="bg-white shadow rounded-lg">
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      className={`flex items-center w-full px-4 py-3 text-left hover:bg-indigo-50 ${
                        activeSection === section.id
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-700"
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <span className="mr-3">{section.icon}</span>
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
}
