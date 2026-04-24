export type VehicleDocument = {
  name: string;
  url: string;
};

export type Vehicle = {
  id: string;
  urlSlug: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number | null;
  fuel: string;
  transmission: string;
  color: string;
  price: number | null;
  currency: string;
  description: string;
  highlights: string[];
  features: string[];
  photos: string[];
  documents: VehicleDocument[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VehicleInput = Omit<
  Vehicle,
  "id" | "urlSlug" | "createdAt" | "updatedAt"
> & {
  urlSlug?: string;
};
