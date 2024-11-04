import { useState, useEffect } from 'react';
import { BuildingIcon, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  nom: string;
  description: string;
  image: string | null;
  creer_le: string;
  mise_a_jour_le: string;
}

const MOCK_CATEGORIES = [
  {
    id: 1,
    nom: "Banques",
    description: "Institutions financières offrant des services bancaires traditionnels.",
    image: null,
    creer_le: "2024-01-01",
    mise_a_jour_le: "2024-01-01"
  },
  {
    id: 2,
    nom: "Assurances",
    description: "Compagnies offrant une protection financière contre les risques.",
    image: null,
    creer_le: "2024-01-01",
    mise_a_jour_le: "2024-01-01"
  },
  {
    id: 3,
    nom: "Microfinance",
    description: "Services financiers destinés aux personnes exclues du système bancaire traditionnel.",
    image: null,
    creer_le: "2024-01-01",
    mise_a_jour_le: "2024-01-01"
  }
];

export default function Categorie() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const getIconComponent = (categoryName: string) => {
    const iconClass = "h-10 w-10 text-green-600";
    
    switch (categoryName.toLowerCase()) {
      case 'banques':
        return <BuildingIcon className={iconClass} />;
      case 'microfinance':
        return <Users className={iconClass} />;
      case 'assurances':
        return <Shield className={iconClass} />;
      default:
        return <BuildingIcon className={iconClass} />;
    }
  };

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setSelectedId(categoryId);
    setTimeout(() => {
      navigate(`/repertoire?category=${encodeURIComponent(categoryName)}`);
    }, 300);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categorie.php', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const categoriesData = Array.isArray(data) ? data : (data.data || []);
        setCategories(categoriesData.length > 0 ? categoriesData : MOCK_CATEGORIES);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setCategories(MOCK_CATEGORIES);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="flex flex-col items-center justify-center p-10 rounded-lg bg-white shadow-2xl">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-6 text-gray-700 font-semibold text-lg">Chargement en cours...</p>
        </div>
      </div>

    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="p-8 rounded-lg bg-white shadow-xl text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Toutes les catégories
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez notre répertoire par catégorie pour trouver l'institution financière qui répond à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.nom)}
              className={`
                group relative bg-white rounded-lg p-6
                transition-all duration-300 ease-in-out
                transform hover:scale-105
                cursor-pointer
                before:absolute before:inset-0 before:rounded-lg before:border-2 
                before:border-transparent before:transition-all before:duration-300
                hover:before:border-green-500
                ${selectedId === category.id ? 'scale-105 ring-2 ring-green-500' : 'shadow hover:shadow-lg'}
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
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}