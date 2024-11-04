import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Search,
  Shield,
  Users,
  Database,
  BuildingIcon,
  LineChart,
  Wallet,
  CreditCard,
  HeartHandshake,
} from 'lucide-react';

// Définition des types
interface Stat {
  id: number;
  name: string;
  value: number;
  icon: React.ElementType;
}

interface Category {
  id: number;
  nom: string;
  description: string;
  image: string | null;
  creer_le: string;
  mise_a_jour_le: string;
}

interface AnimatedCounterProps {
  end: number;
}

const stats: Stat[] = [
  { id: 1, name: 'Entreprises répertoriées', value: 150, icon: Building2 },
  { id: 2, name: 'Catégories', value: 12, icon: Database },
  { id: 3, name: 'Services', value: 20, icon: BuildingIcon },
];

const HeroIcons = () => {
  return (
    <div className="grid grid-cols-3 gap-10">
      <BuildingIcon className="h-24 w-24 text-yellow-400 animate-bounce" />
      <Search className="h-24 w-24 text-yellow-400 animate-pulse" />
      <LineChart className="h-24 w-24 text-yellow-400 animate-float" />
      <Wallet className="h-24 w-24 text-yellow-400 animate-bounce" />
      <CreditCard className="h-24 w-24 text-yellow-400 animate-pulse" />
      <HeartHandshake className="h-24 w-24 text-yellow-400 animate-float" />
    </div>
  );
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
};

export default function Accueil() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getIconComponent = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'banques':
        return <BuildingIcon className="mx-auto h-12 w-12 text-green-700" />;
      case 'microfinance':
        return <Users className="mx-auto h-12 w-12 text-green-700" />;
      case 'assurances':
        return <Shield className="mx-auto h-12 w-12 text-green-700" />;
      default:
        return <BuildingIcon className="mx-auto h-12 w-12 text-green-700" />;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categorie.php', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const categoriesData = Array.isArray(data) ? data : data.data || [];
        setCategories(categoriesData);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Une erreur est survenue lors du chargement des données'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/repertoire?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-700 to-green-900">
        <div className="mx-auto max-w-9xl px-6 py-24 sm:py-180 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="lg:max-w-12xl w-full p-8 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Trouvez les meilleures institutions financières selon vos
                besoins.
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-200">
                Découvrez le plus grand répertoire d'entreprises financières au
                Burkina Faso. Accédez facilement aux informations sur les
                banques, microfinances et assurances.
              </p>
              <div className="mt-10">
                <Link
                  to="/Repertoire"
                  className="rounded-md bg-yellow-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-yellow-600 transition-all"
                >
                  Explorer l'annuaire
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <HeroIcons />
            </div>
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Catégories d'entreprises
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explorez notre répertoire par catégorie pour trouver l'institution
              financière qui répond à vos besoins.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-600 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-auto max-w-2xl">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.nom)}
                  className={`
              group relative bg-white rounded-lg p-6
              transition-all duration-300 ease-in-out
              transform hover:scale-105
              cursor-pointer
              before:absolute before:inset-0 before:rounded-lg before:border-2 
              before:border-transparent before:transition-all before:duration-300
              hover:before:border-green-500
              shadow hover:shadow-lg
            `}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-50 rounded-lg p-3 transition-colors duration-300 group-hover:bg-green-100">
                      {getIconComponent(category.nom)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {category.nom}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 overflow-hidden">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/Categories"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              Voir plus de catégories 🙂
            </Link>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="bg-green-700 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-4">
            Nos chiffres clés
          </h2>
          <p className="text-lg text-white text-center mb-16 max-w-2xl mx-auto">
            Découvrez nos chiffres clés qui illustrent notre impact et notre
            engagement envers nos clients. Ces statistiques témoignent de notre
            croissance, de notre succès et de notre dévouement à fournir des
            services de qualité.
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <stat.icon className="h-12 w-12 text-green-700 mb-4" />
                <dt className="text-lg font-semibold text-gray-900">
                  {stat.name}
                </dt>
                <dd className="text-4xl font-bold text-green-700 mt-2">
                  <AnimatedCounter end={stat.value} />+
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* À propos Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-green-700">
              <img
                src="/src/images/apropos.jpg"
                alt="À propos"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                À propos de PAIF-PME
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                PAIF-PME est votre guide numérique vers le secteur financier du
                Burkina Faso. Notre mission est de faciliter l'accès à
                l'information sur les institutions financières pour les
                entrepreneurs et particuliers.
              </p>
              <div className="mt-10">
                <Link
                  to="/Apropos"
                  className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all shadow-lg"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment utiliser la plateforme */}
      <div className="bg-gray-90 py-24 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Comment utiliser la plateforme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mr-4">
                  1
                </div>
                <h3 className="text-xl font-semibold">Étape 1</h3>
                <div className="flex-1 h-1 bg-green-700 ml-4"></div>
              </div>
              <p className="text-gray-600">
                Rendez-vous sur la section répertoire de la plateforme pour
                accéder à l'ensemble des entreprises et services disponibles.
              </p>
            </div>
            {/* Étape 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mr-4">
                  2
                </div>
                <h3 className="text-xl font-semibold">Étape 2</h3>
                <div className="flex-1 h-1 bg-green-700 ml-4"></div>
              </div>
              <p className="text-gray-600">
                Effectuez une recherche selon vos besoins en utilisant les
                filtres et les catégories, afin de trouver l'entreprise la mieux
                adaptée à votre demande.
              </p>
            </div>
            {/* Étape 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all relative">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mr-4">
                  3
                </div>
                <h3 className="text-xl font-semibold">Étape 3</h3>
                <div className="flex-1 h-1 bg-green-700 ml-4"></div>
              </div>
              <p className="text-gray-600">
                Contactez l'entreprise sélectionnée pour organiser une prise en
                charge et répondre à vos besoins de manière personnalisée.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">
            Application Mobile
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image de l'application */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/src/images/telephone.jpg"
                alt="Application Mobile"
                className="rounded-lg shadow-lg w-3/4 lg:w-full"
              />
            </div>
            {/* Texte et boutons de téléchargement */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Téléchargez notre application mobile
              </h3>
              <p className="text-gray-600 text-lg">
                Accédez à notre répertoire d'entreprises et services directement
                depuis votre mobile, pour une expérience plus rapide et plus
                fluide.
              </p>
              <div className="flex justify-center lg:justify-start gap-4 mt-8">
                {/* Bouton Google Play */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all"
                >
                  <img
                    src="/src/images/android.png"
                    alt="Google Play"
                    className="w-8 h-6 mr-3"
                  />
                  Télécharger sur Google Play
                </a>
                {/* Bouton App Store */}
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition-all"
                >
                  <img
                    src="/src/images/ios.png"
                    alt="App Store"
                    className="w-6 h-6 mr-3"
                  />
                  Télécharger sur l'App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
