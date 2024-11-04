import { useState, useEffect } from 'react';
import { BuildingIcon, Users, Shield, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  nom: string;
  description: string;
  image: string | null;
  categorie_id: number;
  categorie_nom: string;
  creer_le: string;
  mise_a_jour_le: string;
}

const getServiceIcon = (categoryName: string) => {
  const iconClass = "h-10 w-10 text-green-600";
  
  switch (categoryName.toLowerCase()) {
    case 'banques':
      return <BuildingIcon className={iconClass} />;
    case 'microfinance':
      return <Users className={iconClass} />;
    case 'assurances':
      return <Shield className={iconClass} />;
    case 'fintech':
      return <CreditCard className={iconClass} />;
    default:
      return <BuildingIcon className={iconClass} />;
  }
};

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedId(service.id);
    setTimeout(() => {
      navigate(`/repertoire?category=${encodeURIComponent(service.categorie_nom)}&service=${encodeURIComponent(service.nom)}`);
    }, 300);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services.php', {
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
        const servicesData = Array.isArray(data) ? data : (data.data || []);
        setServices(servicesData);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = [...new Set(services.map(service => service.categorie_nom))];
  const filteredServices = selectedCategory
    ? services.filter(service => service.categorie_nom === selectedCategory)
    : services;

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
            Nos Services Financiers
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services financiers adaptés à vos besoins
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <select
            className="block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className={`
                group relative bg-white rounded-lg p-6
                transition-all duration-300 ease-in-out
                transform hover:scale-105
                cursor-pointer
                before:absolute before:inset-0 before:rounded-lg before:border-2 
                before:border-transparent before:transition-all before:duration-300
                hover:before:border-green-500
                ${selectedId === service.id ? 'scale-105 ring-2 ring-green-500' : 'shadow hover:shadow-lg'}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-green-50 rounded-lg p-3 transition-colors duration-300 group-hover:bg-green-100">
                  {getServiceIcon(service.categorie_nom)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.nom}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                  <div className="mt-2 text-sm font-medium text-green-600">
                    {service.categorie_nom}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            Aucun service trouvé pour cette catégorie.
          </div>
        )}
      </div>
    </div>
  );
}