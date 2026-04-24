import fs from "fs";
import path from "path";
import { del } from "@vercel/blob";
import type { Vehicle } from "./vehicle-types";

function uniqueUrls(vehicle: Vehicle): string[] {
  return Array.from(
    new Set([...vehicle.photos, ...vehicle.documents.map((d) => d.url)].filter(Boolean)),
  );
}

function isBlobUrl(url: string): boolean {
  return /^https?:\/\/.+/i.test(url);
}

async function deleteBlobAssets(urls: string[]): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || urls.length === 0) return;
  const cloudUrls = urls.filter(isBlobUrl);
  if (cloudUrls.length === 0) return;
  await del(cloudUrls, { token });
}

function deleteLocalAsset(url: string): void {
  if (!url.startsWith("/uploads/")) return;
  const rel = url.slice(1).split("/").join(path.sep);
  const abs = path.join(process.cwd(), "public", rel);
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch {
    // Ignore individual file failures; we still try the rest.
  }
}

function cleanupLocalDir(vehicleId: string): void {
  const absDir = path.join(process.cwd(), "public", "uploads", "vehicles", vehicleId);
  try {
    if (fs.existsSync(absDir)) fs.rmSync(absDir, { recursive: true, force: true });
  } catch {
    // Directory cleanup best effort.
  }
}

export async function cleanupVehicleAssets(vehicle: Vehicle): Promise<void> {
  const urls = uniqueUrls(vehicle);
  await deleteBlobAssets(urls);
  urls.forEach(deleteLocalAsset);
  cleanupLocalDir(vehicle.id);
}
