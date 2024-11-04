import {
  Award,
  Users,
  Shield,
  Target,
  ArrowRight,
  Globe,
  Zap,
  Rocket,
  BookOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    name: 'Excellence',
    description:
      'Nous nous engageons à fournir des informations précises et à jour sur le secteur financier.',
    icon: Award,
    color: 'text-blue-600',
  },
  {
    name: 'Accessibilité',
    description:
      'Notre plateforme est conçue pour être accessible à tous, des entrepreneurs aux particuliers.',
    icon: Users,
    color: 'text-green-600',
  },
  {
    name: 'Fiabilité',
    description:
      'Nous vérifions et mettons à jour régulièrement les informations de notre répertoire.',
    icon: Shield,
    color: 'text-purple-600',
  },
  {
    name: 'Innovation',
    description:
      "Nous utilisons les dernières technologies pour améliorer l'expérience utilisateur.",
    icon: Target,
    color: 'text-red-600',
  },
];

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Globe,
      title: 'Couverture Complète',
      description:
        'Accès à un annuaire exhaustif des institutions financières du Burkina Faso.',
    },
    {
      icon: Zap,
      title: "Rapidité d'Information",
      description: 'Des données actualisées et instantanément accessibles.',
    },
    {
      icon: Rocket,
      title: 'Solution Innovante',
      description: 'Une plateforme numérique à la pointe de la technologie.',
    },
    {
      icon: BookOpen,
      title: 'Transparence',
      description:
        'Informations détaillées et vérifiées pour une prise de décision éclairée.',
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Pourquoi Choisir PAIF-PME ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all"
            >
              <div className="mb-4 flex justify-center">
                <reason.icon className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-800">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Apropos() {
  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 py-24 shadow-2xl">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              À propos de PAIF-PME
            </motion.h1>
            <p className="mt-6 text-xl leading-8 text-gray-100">
              Votre guide numérique vers le secteur financier du Burkina Faso
            </p>
          </div>
        </div>
      </div>

      {/* Présentation avec Image */}
      <div className="container mx-auto py-16 px-6 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img
            src="/src/images/apropos.jpg"
            alt="PAIF-PME Présentation"
            className="rounded-xl shadow-2xl"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Qui Sommes-Nous ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            PAIF-PME est une plateforme numérique innovante née de la volonté de
            simplifier l'accès à l'information financière au Burkina Faso. Nous
            croyons en la transparence et l'accessibilité du secteur financier
            pour tous les entrepreneurs et particuliers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Notre équipe dynamique travaille continuellement à développer un
            outil référence, précis et fiable pour guider les acteurs
            économiques dans leur parcours financier.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Notre Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Faciliter l'accès à l'information financière en créant un pont
              digital entre les institutions financières et les acteurs
              économiques du Burkina Faso.
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Notre Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Devenir la référence numérique incontournable de l'écosystème
              financier burkinabè, en favorisant la transparence et
              l'innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Valeurs */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nos Valeurs Fondamentales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.name}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all"
              >
                <div
                  className={`mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-opacity-20 ${value.color}`}
                >
                  <value.icon className={`w-8 h-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {value.name}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi Choisir */}
      <WhyChooseSection />

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 py-16 text-center">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à Explorer l'Univers Financier ?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Découvrez notre répertoire complet et propulsez votre projet
            financier
          </p>
          <a
            href="/Repertoire"
            className="inline-flex items-center px-8 py-4 bg-yellow-500 text-white font-bold rounded-full hover:bg-yellow-600 transition-all group"
          >
            Explorer l'Annuaire
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
