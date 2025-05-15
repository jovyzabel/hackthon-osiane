import { useRouter } from "next/router";
import { getUserRole } from "@/lib/auth";

export default function DashboardRedirect() {
  const role = getUserRole(); // fake util for now
  const router = useRouter();

  if (typeof window !== "undefined") {
    switch (role) {
      case "parent":
        router.push("/dashboard/parent");
        break;
      case "secretaire":
        router.push("/dashboard/secretaire");
        break;
      case "analyste":
        router.push("/dashboard/analyste");
        break;
      case "admin":
        router.push("/dashboard/admin");
        break;
      default:
        router.push("/");
        break;
    }
  }
  return <p>Redirection en cours...</p>;
}
