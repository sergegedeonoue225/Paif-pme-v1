import { Building2, Globe, Mail, Phone } from 'lucide-react';
import type { Enterprise } from '../types';

interface Props {
  enterprise: Enterprise;
}

export default function EnterpriseCard({ enterprise }: Props) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-200 transition-all hover:shadow-lg">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {enterprise.nom}
        </h3>
        <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
          {enterprise.categorie_nom}
        </span>
      </div>

      <p className="mb-4 text-gray-600">{enterprise.description}</p>

      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="h-4 w-4" />
          <a href={`tel:${enterprise.numero}`} className="hover:text-green-700">
            {enterprise.numero}
          </a>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4" />
          <a
            href={`mailto:${enterprise.email}`}
            className="hover:text-green-700"
          >
            {enterprise.email}
          </a>
        </div>

        {enterprise.site_web && (
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="h-4 w-4" />
            <a
              href={enterprise.site_web}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-700"
            >
              Site web
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 border-t pt-4">
        <h4 className="mb-2 font-medium text-gray-900">Services:</h4>
        <div className="flex flex-wrap gap-2">
          {enterprise.services_noms.split(',').map((service) => (
            <span
              key={service}
              className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
