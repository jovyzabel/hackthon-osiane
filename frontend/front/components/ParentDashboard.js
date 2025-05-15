import { useEffect, useState } from "react";
import axios from "axios";

export default function ParentDashboard() {
  const [dossiers, setDossiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les dossiers de l'utilisateur connecté
    axios
      .get("/api/dossiers")
      .then((response) => {
        setDossiers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Chargement...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord des Parents</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Dossiers de l'enfant</h2>
        {dossiers.length === 0 ? (
          <p className="text-gray-600">Aucun dossier trouvé.</p>
        ) : (
          <ul className="space-y-4">
            {dossiers.map((dossier) => (
              <li key={dossier.id} className="border-b pb-4">
                <h3 className="text-lg font-medium">{dossier.nom}</h3>
                <p className="text-gray-600">
                  Date de naissance:{" "}
                  {new Date(dossier.date_naissance).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Statut: {dossier.statut_dossier}
                </p>
                <div className="mt-2">
                  <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
                    Voir les détails
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
