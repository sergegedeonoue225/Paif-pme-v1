import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* À propos de nous */}
          <div>
            <h3 className="text-2xl font-bold">PAIF-PME</h3>
            <p className="mt-4">
              PAIF-PME est le premier répertoire numérique dédié aux entreprises
              financières du Burkina Faso. Notre mission est de faciliter
              l'accès à l'information et de promouvoir la transparence dans le
              secteur financier.
            </p>
          </div>

          {/* Nos Pages */}
          <div>
            <h4 className="text-lg font-semibold">Nos Pages</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-400">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/Repertoire" className="hover:text-yellow-400">
                  Répertoire
                </Link>
              </li>
              <li>
                <Link to="/Apropos" className="hover:text-yellow-400">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+226 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>contact@paif-pme.bf</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Ouagadougou, Burkina Faso</span>
              </div>
            </div>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h4 className="text-lg font-semibold">Suivez-nous</h4>
            <p className="mt-4 mb-4">
              Restez connecté avec nous sur les réseaux sociaux pour les
              dernières actualités et mises à jour.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-yellow-400">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-green-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>&copy; 2024 PAIF-PME. Tous droits réservés.</p>
            <div className="flex space-x-4">
              <Link to="/Apropos" className="hover:text-yellow-400">
                Mentions légales
              </Link>
              <Link to="/contact" className="hover:text-yellow-400">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
