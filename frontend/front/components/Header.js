
import Link from 'next/link';

export default function Header() {
  return ( 
      <header className="bg-pink-600 text-white p-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.jpg" alt="Logo de l'Association" className="h-10 w-auto mr-4 rounded-2xl" />
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:underline">
                À Propos
              </Link>
            </li>
          </ul>
        </nav>
      </header>
  );
}

