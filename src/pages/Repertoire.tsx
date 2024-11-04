import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Globe,
  Building2,
  Landmark,
  Building,
  CreditCard,
  Search,
  Filter,
  MapPin,
} from 'lucide-react';
import FilterComponent from '../components/FilterComponent';

interface Enterprise {
  id: number;
  nom: string;
  description: string;
  image: string | null;
  conditions: string;
  numero: string;
  email: string;
  site_web: string;
  categorie_id: number;
  categorie_nom: string;
  services_noms: string;
}

const ITEMS_PER_PAGE = 12;

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'banque':
      return <Globe className="h-8 w-8 text-white" />;
    case 'assurance':
      return <Building2 className="h-8 w-8 text-white" />;
    case 'microfinance':
      return <Landmark className="h-8 w-8 text-white" />;
    case 'fintech':
      return <CreditCard className="h-8 w-8 text-white" />;
    default:
      return <Building className="h-8 w-8 text-white" />;
  }
};

const getCategoryColor = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'banque':
      return 'from-blue-600 to-blue-800';
    case 'assurance':
      return 'from-purple-600 to-purple-800';
    case 'microfinance':
      return 'from-green-600 to-green-800';
    case 'fintech':
      return 'from-indigo-600 to-indigo-800';
    default:
      return 'from-gray-600 to-gray-800';
  }
};

export default function Repertoire() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const response = await fetch('/api/entreprises.php');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const enterprisesData = Array.isArray(data) ? data : data.data || [];
        setEnterprises(enterprisesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement des données');
      } finally {
        setLoading(false);
      }
    };
    fetchEnterprises();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedService]);

  const filteredEnterprises = enterprises.filter((enterprise) => {
    const matchesSearch = enterprise.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enterprise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || enterprise.categorie_nom === selectedCategory;
    const matchesService = !selectedService ||
      enterprise.services_noms.toLowerCase().includes(selectedService.toLowerCase());
    return matchesSearch && matchesCategory && matchesService;
  });

  const totalPages = Math.ceil(filteredEnterprises.length / ITEMS_PER_PAGE);
  const paginatedEnterprises = filteredEnterprises.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categories = [...new Set(enterprises.map((e) => e.categorie_nom))];
  const services = [...new Set(enterprises.flatMap((e) =>
    e.services_noms.split(',').map((s) => s.trim())
  ))];

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-green-800">
  Répertoire des Entreprises Financières
</h1>

          <p className="mt-4 text-xl text-gray-600">
            Découvrez les institutions financières du Burkina Faso
          </p>
        </div>

        {/* Search and Filters Section */}
        <div className=" p-6 mb-12">
          {/* Barre de recherche et filtres */}
          <FilterComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            categories={categories}
            services={services}
          />


        </div>

        {/* Enterprises Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedEnterprises.map((enterprise) => (
            <div
              key={enterprise.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              {/* Header with gradient background */}
              <div className="bg-green-800 p-6 text-white">
                <div className="flex items-center gap-4">
                  {enterprise.image ? (
                    <img
                      src={enterprise.image}
                      alt={enterprise.nom}
                      className="h-16 w-16 rounded-full border-2 border-white shadow-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm">
                      {getCategoryIcon(enterprise.categorie_nom)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold">{enterprise.nom}</h3>
                    <p className="text-white/50">{enterprise.categorie_nom}</p>
                  </div>
                </div>
              </div>


              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  {enterprise.description}
                </p>

                {/* Contact Information */}
                <div className="space-y-3">
                  {enterprise.numero && (
                    <a
                      href={`tel:${enterprise.numero}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{enterprise.numero}</span>
                    </a>
                  )}

                  {enterprise.email && (
                    <a
                      href={`mailto:${enterprise.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{enterprise.email}</span>
                    </a>
                  )}

                  {enterprise.site_web && (
                    <a
                      href={enterprise.site_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span>Visiter le site web</span>
                    </a>
                  )}
                </div>

                {/* Services */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Services proposés
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {enterprise.services_noms.split(',').map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {service.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                {enterprise.conditions && (
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Conditions
                    </h4>
                    <p className="text-gray-600">{enterprise.conditions}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEnterprises.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-gray-600">
                Aucune entreprise ne correspond à vos critères de recherche.
                Essayez de modifier vos filtres.
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredEnterprises.length > 0 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
            >
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}