import { Menu, X, BookOpen, Home, Phone, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'À propos de nous', href: '/Apropos', icon: BookOpen },
  { name: 'Annuaire', href: '/Repertoire', icon: Building2 },
  { name: 'Categories', href: '/Categories', icon: Building2 },
  { name: 'Services', href: '/Services', icon: Building2 },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white shadow-md ${
        isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-8 lg:px-12 lg:py-6">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-3xl font-bold text-green-700">PAIF-PME</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8" aria-hidden="true" />
            ) : (
              <Menu className="h-8 w-8" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-16">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-lg font-semibold ${
                location.pathname === item.href
                  ? 'text-green-700'
                  : 'text-gray-900 hover:text-green-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-6 pb-4 pt-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  location.pathname === item.href
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-900 hover:bg-green-50 hover:text-green-700'
                } block rounded-md px-4 py-3 text-lg font-medium`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
