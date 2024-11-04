export interface Enterprise {
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
  services_ids: string;
}

export interface Category {
  id: number;
  name: string;
}