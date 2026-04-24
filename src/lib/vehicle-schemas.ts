import { z } from "zod";

const docSchema = z.object({
  name: z.string().min(1).max(200),
  url: z.string().min(1).max(2000),
});

export const vehicleCreateSchema = z.object({
  brand: z.string().min(1).max(120),
  model: z.string().min(1).max(120),
  year: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 1),
  mileageKm: z.coerce.number().int().min(0).nullable().optional(),
  fuel: z.string().min(1).max(80),
  transmission: z.string().min(1).max(80),
  color: z.string().min(1).max(80),
  price: z.coerce.number().min(0).nullable().optional(),
  currency: z.string().min(1).max(8).default("ARS"),
  description: z.string().max(20000).default(""),
  highlights: z.array(z.string().max(300)).max(30).default([]),
  photos: z.array(z.string().max(2000)).default([]),
  documents: z.array(docSchema).max(20).default([]),
  published: z.boolean().default(true),
  urlSlug: z.string().min(3).max(32).regex(/^[a-z0-9-]+$/).optional(),
});

export const vehiclePatchSchema = vehicleCreateSchema.partial();
