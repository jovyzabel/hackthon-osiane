// pages/dashboard/[role].js
import AdminDashboard from "@/components/AdminDashboard";
import ParentDashboard from "@/components/ParentDashboard";
import { useRouter } from "next/router";

export default function RoleDashboard() {
  const router = useRouter();
  const { role } = router.query;

  if (!role) return <p>Chargement...</p>;

  switch (role) {
    case "parent":
      return <ParentDashboard/>;
    case "secretaire":
      return <div>Dashboard Secrétaire</div>;
    case "analyste":
      return <div>Dashboard Analyste</div>;
    case "admin":
      return <div>Admin</div>;
    default:
      return <div>Rôle inconnu</div>;
  }
}

export function getUserRole() {
  return "admin"; // test
}