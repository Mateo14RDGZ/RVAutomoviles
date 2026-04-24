import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { customAlphabet } from "nanoid";
import type { Vehicle, VehicleInput } from "./vehicle-types";
import { resolveDatabaseUrl } from "./database-url";

const nanoidSlug = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "vehicles.json");

type StoreFile = { vehicles: Vehicle[] };

function databaseUrl(): string | undefined {
  return resolveDatabaseUrl();
}

let ensureDbPromise: Promise<void> | null = null;

async function ensureDbTable(): Promise<void> {
  const url = databaseUrl();
  if (!url) return;
  if (!ensureDbPromise) {
    const sql = neon(url);
    ensureDbPromise = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS vehicle_store (
          id smallint PRIMARY KEY,
          payload text NOT NULL
        )
      `;
      await sql`
        INSERT INTO vehicle_store (id, payload) VALUES (1, '{"vehicles":[]}')
        ON CONFLICT (id) DO NOTHING
      `;
    })();
  }
  await ensureDbPromise;
}

function readFileFs(): StoreFile {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ vehicles: [] }, null, 2), "utf-8");
  }
  return JSON.parse(fs.readFileSync(dataFile, "utf-8")) as StoreFile;
}

function writeFileFs(store: StoreFile): void {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2), "utf-8");
}

async function readStore(): Promise<StoreFile> {
  const url = databaseUrl();
  if (url) {
    await ensureDbTable();
    const sql = neon(url);
    const rows = await sql`SELECT payload FROM vehicle_store WHERE id = 1`;
    if (!rows.length) {
      return { vehicles: [] };
    }
    const row = rows[0] as { payload: string };
    return JSON.parse(row.payload) as StoreFile;
  }
  return readFileFs();
}

async function writeStore(store: StoreFile): Promise<void> {
  const url = databaseUrl();
  if (url) {
    await ensureDbTable();
    const sql = neon(url);
    const text = JSON.stringify(store);
    await sql`UPDATE vehicle_store SET payload = ${text} WHERE id = 1`;
    return;
  }
  writeFileFs(store);
}

function newSlug(existing: Set<string>): string {
  for (let i = 0; i < 8; i++) {
    const s = nanoidSlug();
    if (!existing.has(s)) return s;
  }
  return nanoidSlug() + nanoidSlug();
}

export async function listVehicles(): Promise<Vehicle[]> {
  const store = await readStore();
  return store.vehicles;
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const store = await readStore();
  return store.vehicles.find((v) => v.id === id);
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  const store = await readStore();
  return store.vehicles.find((v) => v.urlSlug === slug);
}

export async function createVehicle(input: VehicleInput): Promise<Vehicle> {
  const store = await readStore();
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
  await writeStore(store);
  return vehicle;
}

export async function updateVehicle(
  id: string,
  patch: Partial<VehicleInput>,
): Promise<Vehicle | null> {
  const store = await readStore();
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
  await writeStore(store);
  return next;
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const store = await readStore();
  const before = store.vehicles.length;
  store.vehicles = store.vehicles.filter((v) => v.id !== id);
  if (store.vehicles.length === before) return false;
  await writeStore(store);
  return true;
}

/** True si los datos van a Postgres (recomendado en Vercel). */
export function isRemoteStore(): boolean {
  return Boolean(resolveDatabaseUrl());
}
