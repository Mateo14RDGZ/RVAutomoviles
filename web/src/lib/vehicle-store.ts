import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { customAlphabet } from "nanoid";
import type { Vehicle, VehicleInput } from "./vehicle-types";

const nanoidSlug = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "vehicles.json");

type StoreFile = { vehicles: Vehicle[] };

function ensureFile(): void {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ vehicles: [] }, null, 2), "utf-8");
  }
}

function readFile(): StoreFile {
  ensureFile();
  return JSON.parse(fs.readFileSync(dataFile, "utf-8")) as StoreFile;
}

function writeFile(store: StoreFile): void {
  ensureFile();
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2), "utf-8");
}

function newSlug(existing: Set<string>): string {
  for (let i = 0; i < 8; i++) {
    const s = nanoidSlug();
    if (!existing.has(s)) return s;
  }
  return nanoidSlug() + nanoidSlug();
}

export function listVehicles(): Vehicle[] {
  return readFile().vehicles;
}

export function getVehicleById(id: string): Vehicle | undefined {
  return readFile().vehicles.find((v) => v.id === id);
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return readFile().vehicles.find((v) => v.urlSlug === slug);
}

export function createVehicle(input: VehicleInput): Vehicle {
  const store = readFile();
  const existingSlugs = new Set(store.vehicles.map((v) => v.urlSlug));
  const now = new Date().toISOString();
  const id = randomUUID();
  const urlSlug = input.urlSlug?.trim() || newSlug(existingSlugs);
  if (store.vehicles.some((v) => v.urlSlug === urlSlug)) {
    throw new Error("Slug duplicado");
  }
  const vehicle: Vehicle = {
    id,
    urlSlug,
    brand: input.brand,
    model: input.model,
    year: input.year,
    mileageKm: input.mileageKm,
    fuel: input.fuel,
    transmission: input.transmission,
    color: input.color,
    price: input.price,
    currency: input.currency,
    description: input.description,
    highlights: input.highlights,
    photos: input.photos,
    documents: input.documents,
    published: input.published,
    createdAt: now,
    updatedAt: now,
  };
  store.vehicles.unshift(vehicle);
  writeFile(store);
  return vehicle;
}

export function updateVehicle(id: string, patch: Partial<VehicleInput>): Vehicle | null {
  const store = readFile();
  const idx = store.vehicles.findIndex((v) => v.id === id);
  if (idx < 0) return null;
  const cur = store.vehicles[idx];
  const applied: Partial<Vehicle> = {};
  for (const [key, value] of Object.entries(patch) as [keyof VehicleInput, unknown][]) {
    if (value === undefined) continue;
    (applied as Record<string, unknown>)[key] = value;
  }
  const nextSlug =
    typeof applied.urlSlug === "string" ? applied.urlSlug.trim() : cur.urlSlug;
  if (nextSlug !== cur.urlSlug) {
    if (store.vehicles.some((v) => v.urlSlug === nextSlug && v.id !== id)) {
      throw new Error("Slug duplicado");
    }
  }
  const next: Vehicle = {
    ...cur,
    ...applied,
    urlSlug: nextSlug,
    id: cur.id,
    createdAt: cur.createdAt,
    updatedAt: new Date().toISOString(),
  };
  store.vehicles[idx] = next;
  writeFile(store);
  return next;
}

export function deleteVehicle(id: string): boolean {
  const store = readFile();
  const before = store.vehicles.length;
  store.vehicles = store.vehicles.filter((v) => v.id !== id);
  if (store.vehicles.length === before) return false;
  writeFile(store);
  return true;
}
