import { useState } from "react";
import { Eye, EyeOff, User, Lock, Shield, LogIn } from "lucide-react";
import { useRouter } from "next/router";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("parent");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulation d'une requête API
    setTimeout(() => {
      setIsLoading(false);

      
      if (email && password) {
        console.log({
          email,
          password,
          role: isRegister ? role : "to be determined",
          action: isRegister ? "register" : "login",
        });

        // Redirection 
        router.push('/');
      } else {
        setError("Veuillez remplir tous les champs");
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegister ? "Créer un compte" : "Connexion"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegister
              ? "Créez un nouveau compte"
              : "Connectez-vous à votre compte"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Adresse email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-10 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rôle
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="analyste">Analyste</option>
                    <option value="parent">Parent</option>
                    <option value="secretaire">Secrétaire</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {!isRegister && (
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Mot de passe oublié?</a>
              </div>
            </div>
          )}

          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-500 py-3 px-4 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-amber-50 group-hover:text-amber-50" />
              </span>
              {isLoading
                ? "Chargement..."
                : isRegister
                ? "S'inscrire"
                : "Se connecter"}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-gray-800 hover:text-gray-700"
          >
            {isRegister ? "Déjà un compte? Se connecter" : "Créer un compte"}
          </button>
        </div>
      </div>
    </div>
  );
}
