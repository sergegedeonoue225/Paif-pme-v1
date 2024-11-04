import { FC, useEffect, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface Category {
  id: number;
  nom: string;
}

interface Service {
  id: number;
  nom: string;
}

interface ApiResponse<T> {
  data: T[];
}

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

const FilterComponent: FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedService,
  setSelectedService,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, servicesResponse] = await Promise.all([
          fetch('/api/categorie.php', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }),
          fetch('/api/services.php', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!categoriesResponse.ok || !servicesResponse.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const categoriesData: ApiResponse<Category> =
          await categoriesResponse.json();
        const servicesData: ApiResponse<Service> =
          await servicesResponse.json();

        setCategories(categoriesData.data || []);
        setServices(servicesData.data || []);
      } catch (err) {
        console.error('Erreur:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Une erreur est survenue lors du chargement des données'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    const serviceFromUrl = searchParams.get('service');
    const searchFromUrl = searchParams.get('search');

    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
    if (serviceFromUrl && serviceFromUrl !== selectedService) {
      setSelectedService(serviceFromUrl);
    }
    if (searchFromUrl && searchFromUrl !== searchTerm) {
      setSearchTerm(searchFromUrl);
    }
  }, [
    searchParams,
    searchTerm,
    selectedCategory,
    selectedService,
    setSearchTerm,
    setSelectedCategory,
    setSelectedService,
  ]);

  const updateSearchParams = (
    type: 'category' | 'service' | 'search',
    value: string
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set(type, value);
    } else {
      newSearchParams.delete(type);
    }

    setSearchParams(newSearchParams);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateSearchParams('search', value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateSearchParams('category', value);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    updateSearchParams('service', value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedService('');
    setSearchParams(new URLSearchParams());
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-600">
          <p>Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Barre de recherche */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            placeholder="Rechercher une entreprise..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Filtre par catégorie */}
        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
          <select
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.nom}>
                {category.nom}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Filtre par service */}
        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
          <select
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
            value={selectedService}
            onChange={(e) => handleServiceChange(e.target.value)}
          >
            <option value="">Tous les services</option>
            {services.map((service) => (
              <option key={service.id} value={service.nom}>
                {service.nom}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bouton de réinitialisation des filtres */}
      {(selectedCategory || selectedService || searchTerm) && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
