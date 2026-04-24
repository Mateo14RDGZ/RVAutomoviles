"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Vehicle } from "@/lib/vehicle-types";

const featureOptions = ["Aire", "Vidrios electricos", "Direccion"] as const;
const allowedImageExt = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "gif",
  "bmp",
  "tif",
  "tiff",
  "heic",
  "heif",
  "jfif",
] as const;
const maxUploadBytesPerPhoto = 12 * 1024 * 1024;
const compressThresholdBytes = 3 * 1024 * 1024;
const uploadTimeoutMs = 45000;

type Props =
  | { mode: "create" }
  | { mode: "edit"; initial: Vehicle };

function emptyForm() {
  return {
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileageKm: "" as string | number,
    fuel: "",
    transmission: "",
    color: "",
    price: "" as string | number,
    currency: "USD",
    description: "",
    highlightsText: "",
    features: [] as string[],
    photos: [] as string[],
    documents: [] as { name: string; url: string }[],
    published: true,
    urlSlug: "",
  };
}

function fromVehicle(v: Vehicle) {
  return {
    brand: v.brand,
    model: v.model,
    year: v.year,
    mileageKm: v.mileageKm ?? "",
    fuel: v.fuel,
    transmission: v.transmission,
    color: v.color,
    price: v.price ?? "",
    currency: v.currency,
    description: v.description,
    highlightsText: v.highlights.join("\n"),
    features: v.features ?? [],
    photos: [...v.photos],
    documents: [...v.documents],
    published: v.published,
    urlSlug: v.urlSlug,
  };
}

async function compressImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (file.size <= compressThresholdBytes) return file;

  const bitmap = await createImageBitmap(file);
  const maxDimension = 1920;
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const preferredType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, preferredType, 0.82),
  );
  if (!blob) return file;

  const ext = preferredType === "image/png" ? "png" : "jpg";
  const nameWithoutExt = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${nameWithoutExt}.${ext}`, { type: preferredType });
}

export function VehicleAdminForm(props: Props) {
  const router = useRouter();
  const isEdit = props.mode === "edit";
  const vehicleId = isEdit ? props.initial.id : null;

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [pendingPhotos, setPendingPhotos] = useState<Array<{ file: File; previewUrl: string }>>([]);
  const [form, setForm] = useState(() =>
    isEdit ? fromVehicle(props.initial) : emptyForm(),
  );

  const sharePath = useMemo(() => {
    if (!isEdit) return "";
    const slug = form.urlSlug || (props.mode === "edit" ? props.initial.urlSlug : "");
    return `/v/${slug}`;
  }, [isEdit, form.urlSlug, props]);

  const shareUrl = useMemo(() => {
    if (!sharePath) return "";
    if (typeof window === "undefined") return sharePath;
    return `${window.location.origin}${sharePath}`;
  }, [sharePath]);

  useEffect(() => {
    return () => {
      pendingPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [pendingPhotos]);

  function toPayload() {
    const highlights = form.highlightsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const mileageKm =
      form.mileageKm === "" || form.mileageKm === null || form.mileageKm === undefined
        ? null
        : Number(form.mileageKm);
    const price =
      form.price === "" || form.price === null || form.price === undefined
        ? null
        : Number(form.price);
    return {
      brand: form.brand.trim(),
      model: form.model.trim(),
      year: Number(form.year),
      mileageKm: Number.isFinite(mileageKm as number) ? (mileageKm as number) : null,
      fuel: form.fuel.trim(),
      transmission: form.transmission.trim(),
      color: form.color.trim(),
      price: Number.isFinite(price as number) ? (price as number) : null,
      currency: "USD",
      description: form.description,
      highlights,
      features: form.features,
      photos: form.photos,
      documents: form.documents,
      published: form.published,
      ...(form.urlSlug.trim() ? { urlSlug: form.urlSlug.trim().toLowerCase() } : {}),
    };
  }

  async function save() {
    setError(null);
    setNotice(null);
    setSaving(true);
    try {
      const payload = toPayload();
      const url = isEdit ? `/api/admin/vehicles/${vehicleId}` : "/api/admin/vehicles";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; vehicle?: Vehicle };
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");
      if (!isEdit && data.vehicle) {
        if (pendingPhotos.length > 0) {
          const preparedPending = await prepareUploadFiles(pendingPhotos.map((photo) => photo.file));
          const uploadedUrls = await uploadFilesForVehicle(
            data.vehicle.id,
            preparedPending,
          );
          if (uploadedUrls.length > 0) {
            const patchRes = await fetch(`/api/admin/vehicles/${data.vehicle.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ photos: uploadedUrls }),
            });
            if (!patchRes.ok) throw new Error("No se pudieron guardar las fotos seleccionadas.");
          }
        }
        router.push(`/admin/vehicles/${data.vehicle.id}/edit`);
        router.refresh();
        return;
      }
      setNotice("Cambios guardados.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  async function persistMedia(patch: {
    photos?: string[];
    documents?: { name: string; url: string }[];
  }) {
    if (!isEdit || !vehicleId) return;
    const res = await fetch(`/api/admin/vehicles/${vehicleId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) throw new Error(data.error || "No se pudo guardar la media");
  }

  async function uploadFilesForVehicle(targetVehicleId: string, files: File[]): Promise<string[]> {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const url = await uploadSingleWithRetry(targetVehicleId, file);
      uploadedUrls.push(url);
    }
    return uploadedUrls;
  }

  async function uploadSingleWithRetry(targetVehicleId: string, file: File): Promise<string> {
    let lastError = `Falló la subida de ${file.name}`;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), uploadTimeoutMs);
      try {
        const fd = new FormData();
        fd.set("vehicleId", targetVehicleId);
        fd.set("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: fd,
          signal: controller.signal,
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
        if (!res.ok || !data.url) throw new Error(data.error || `Falló la subida de ${file.name}`);
        return data.url;
      } catch (e) {
        lastError =
          e instanceof Error ? e.message : `Falló la subida de ${file.name} (intento ${attempt}/3)`;
        if (attempt < 3) {
          await new Promise((r) => setTimeout(r, attempt * 800));
        }
      } finally {
        clearTimeout(timeout);
      }
    }
    throw new Error(lastError);
  }

  function queuePendingPhotos(files: File[]) {
    const queued = files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }));
    setPendingPhotos((current) => [...current, ...queued]);
    setNotice(
      queued.length > 1
        ? `${queued.length} fotos listas para subir al guardar.`
        : "Foto lista para subir al guardar.",
    );
  }

  function isImageFile(file: File): boolean {
    if (file.type.startsWith("image/")) return true;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    return allowedImageExt.includes(ext as (typeof allowedImageExt)[number]);
  }

  function normalizePhotoSelection(files: File[]): File[] {
    const valid = files.filter(isImageFile);
    if (valid.length !== files.length) {
      setError("Algunos archivos no son imágenes compatibles. Se ignoraron automáticamente.");
    }
    return valid;
  }

  async function prepareUploadFiles(files: File[]): Promise<File[]> {
    const prepared: File[] = [];
    for (const file of files) {
      let candidate = file;
      try {
        candidate = await compressImageForUpload(file);
      } catch {
        candidate = file;
      }
      if (candidate.size > maxUploadBytesPerPhoto) {
        throw new Error(
          `La foto ${file.name} sigue siendo muy pesada. Intentá con otra más liviana (máx. 12 MB por foto).`,
        );
      }
      prepared.push(candidate);
    }
    return prepared;
  }

  async function removePhoto(url: string) {
    const nextPhotos = form.photos.filter((p) => p !== url);
    setForm((f) => ({ ...f, photos: nextPhotos }));
    setImageErrors((prev) => {
      const copy = { ...prev };
      delete copy[url];
      return copy;
    });
    if (!isEdit || !vehicleId) return;
    setError(null);
    setNotice(null);
    try {
      await persistMedia({ photos: nextPhotos });
      setNotice("Foto eliminada y cambios guardados.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar la foto");
    }
  }

  async function uploadFiles(files: File[]) {
    if (!vehicleId) {
      setError("Creá el vehículo primero; después podrás subir archivos.");
      return;
    }
    setUploading(true);
    setError(null);
    setNotice(null);
    try {
      const preparedFiles = await prepareUploadFiles(files);
      const uploadedUrls: string[] = [];
      const failed: string[] = [];
      for (const file of preparedFiles) {
        try {
          const url = await uploadSingleWithRetry(vehicleId, file);
          uploadedUrls.push(url);
        } catch {
          failed.push(file.name);
        }
      }
      if (!uploadedUrls.length) {
        throw new Error("No se pudo subir ninguna foto. Revisá conexión e intentá nuevamente.");
      }
      const nextPhotos = [...form.photos, ...uploadedUrls];
      setForm((f) => ({ ...f, photos: nextPhotos }));
      await persistMedia({ photos: nextPhotos });
      if (failed.length > 0) {
        setNotice(
          `${uploadedUrls.length} foto(s) subida(s). ${failed.length} fallaron y podés reintentarlas.`,
        );
      } else {
        setNotice(
          uploadedUrls.length > 1
            ? `${uploadedUrls.length} fotos subidas y guardadas.`
            : "Foto subida y guardada.",
        );
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de subida");
    } finally {
      setUploading(false);
    }
  }

  async function uploadDoc(file: File, name: string) {
    if (!vehicleId) {
      setError("Creá el vehículo primero; después podrás subir documentación.");
      return;
    }
    setUploading(true);
    setError(null);
    setNotice(null);
    try {
      const fd = new FormData();
      fd.set("vehicleId", vehicleId);
      fd.set("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
      if (!res.ok || !data.url) throw new Error(data.error || "Falló la subida");
      const nextDocs = [...form.documents, { name: name.trim() || file.name, url: data.url! }];
      setForm((f) => ({
        ...f,
        documents: nextDocs,
      }));
      await persistMedia({ documents: nextDocs });
      setNotice("Documento subido y guardado.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de subida");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="vehicle-form space-y-6">
      {error ? (
        <p className="rounded-xl border border-red-400/30 bg-red-950/50 px-3 py-2.5 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="rounded-xl border border-emerald-400/25 bg-emerald-950/40 px-3 py-2.5 text-sm text-emerald-100">
          {notice}
        </p>
      ) : null}

      {isEdit ? (
        <section className="admin-card space-y-3">
          <h2 className="admin-card-title">Enlace para clientes</h2>
          <p className="admin-card-muted">
            Compartí esta URL en Instagram, WhatsApp o donde quieras. Solo se muestra si el vehículo
            está publicado.
          </p>
          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="break-all rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-200">
              {shareUrl}
            </code>
            <button
              type="button"
              className="rv-btn-secondary shrink-0 px-4 py-2"
              onClick={() => void navigator.clipboard.writeText(shareUrl)}
            >
              Copiar
            </button>
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="admin-card space-y-4">
          <h2 className="admin-card-title">Datos del vehículo</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="admin-label">
              Marca
              <input
                className="admin-field"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
              />
            </label>
            <label className="admin-label">
              Modelo
              <input
                className="admin-field"
                value={form.model}
                onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
              />
            </label>
            <label className="admin-label">
              Año
              <input
                type="number"
                className="admin-field"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
              />
            </label>
            <label className="admin-label">
              Kilometraje (km)
              <input
                type="number"
                className="admin-field"
                value={form.mileageKm}
                onChange={(e) => setForm((f) => ({ ...f, mileageKm: e.target.value }))}
                placeholder="Opcional"
              />
            </label>
            <label className="admin-label">
              Combustible
              <input
                className="admin-field"
                value={form.fuel}
                onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))}
                placeholder="Nafta, diésel, híbrido…"
              />
            </label>
            <label className="admin-label">
              Caja
              <input
                className="admin-field"
                value={form.transmission}
                onChange={(e) => setForm((f) => ({ ...f, transmission: e.target.value }))}
                placeholder="Manual, automática…"
              />
            </label>
            <label className="admin-label">
              Color
              <input
                className="admin-field"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              />
            </label>
            <label className="admin-label">
              Precio
              <input
                type="number"
                className="admin-field"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="Opcional"
              />
            </label>
            <div className="admin-label">
              Moneda
              <div className="admin-field border-white/10 bg-slate-950/40 text-slate-300">
                USD (dólares)
              </div>
            </div>
          </div>

          <fieldset className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Checklist de equipamiento
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {featureOptions.map((feature) => (
                <label key={feature} className="flex items-center gap-2 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.features.includes(feature)}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        features: e.target.checked
                          ? [...f.features, feature]
                          : f.features.filter((x) => x !== feature),
                      }))
                    }
                  />
                  {feature}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="admin-label">
            Slug de URL (opcional)
            <input
              className="admin-field"
              value={form.urlSlug}
              onChange={(e) =>
                setForm((f) => ({ ...f, urlSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))
              }
              placeholder="Se genera automáticamente si lo dejás vacío"
            />
            <span className="mt-1 block text-[11px] text-slate-500">
              Solo letras minúsculas, números y guiones. Si lo cambiás, los enlaces viejos dejan de
              funcionar.
            </span>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
            />
            Publicado (visible para clientes)
          </label>

          <label className="admin-label">
            Descripción
            <textarea
              className="admin-field min-h-[120px]"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </label>

          <label className="admin-label">
            Destacados (uno por línea)
            <textarea
              className="admin-field min-h-[80px]"
              value={form.highlightsText}
              onChange={(e) => setForm((f) => ({ ...f, highlightsText: e.target.value }))}
              placeholder={"Airbags\nÚnico dueño\nService oficial…"}
            />
          </label>
        </section>

        <div className="space-y-6">
          <section className="admin-card space-y-3">
            <h2 className="admin-card-title">Fotos</h2>
            <p className="admin-card-muted">
              {isEdit
                ? "Podés subir varias fotos juntas. Si son pesadas, se optimizan automáticamente para evitar fallos."
                : "Elegí varias fotos ahora; se optimizan y se subirán al guardar el vehículo."}
            </p>
            <input
              type="file"
              accept="image/*,.heic,.heif,.avif,.webp,.jpg,.jpeg,.png,.gif,.bmp,.tif,.tiff,.jfif"
              multiple
              disabled={uploading}
              onChange={(e) => {
                const selected = normalizePhotoSelection(Array.from(e.target.files || []));
                e.target.value = "";
                if (!selected.length) return;
                if (!vehicleId) {
                  queuePendingPhotos(selected);
                  return;
                }
                void uploadFiles(selected);
              }}
              className="block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-slate-950/40 px-3 py-2.5 text-sm text-slate-300 transition-colors duration-200 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-500/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-sky-200 hover:border-sky-400/30"
            />
            {!vehicleId && pendingPhotos.length > 0 ? (
              <p className="text-xs text-amber-200/90">
                Estas fotos se subirán al guardar y serán las que se mostrarán en catálogo y ficha.
              </p>
            ) : null}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {form.photos.map((url, index) => (
                <li
                  key={`${url}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/40"
                >
                  {imageErrors[url] ? (
                    <div className="flex aspect-[4/3] items-center justify-center px-3 text-center text-xs text-slate-400">
                      No se pudo cargar esta foto. Podés eliminarla y volver a subirla.
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt={`Foto ${index + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                      onError={() => setImageErrors((prev) => ({ ...prev, [url]: true }))}
                    />
                  )}
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-full bg-black/75 px-2 py-0.5 text-xs text-white transition-opacity hover:bg-black/90"
                    onClick={() => void removePhoto(url)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
              {!vehicleId
                ? pendingPhotos.map((photo, index) => (
                    <li
                      key={photo.previewUrl}
                      className="relative overflow-hidden rounded-xl border border-amber-400/35 bg-amber-950/35"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.previewUrl}
                        alt={`Foto pendiente ${index + 1}`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                        Pendiente
                      </span>
                      <button
                        type="button"
                        className="absolute right-2 top-2 rounded-full bg-black/75 px-2 py-0.5 text-xs text-white"
                        onClick={() => {
                          URL.revokeObjectURL(photo.previewUrl);
                          setPendingPhotos((current) =>
                            current.filter((x) => x.previewUrl !== photo.previewUrl),
                          );
                        }}
                      >
                        Quitar
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </section>

          <section className="admin-card space-y-3">
            <h2 className="admin-card-title">Documentación</h2>
            <p className="admin-card-muted">PDF o imágenes (seguro, informe, título, etc.).</p>
            <button
              type="button"
              disabled={!vehicleId || uploading}
              className="rv-btn-secondary disabled:opacity-50"
              onClick={() => {
                const name = window.prompt("Nombre que verá el cliente (ej. Informe de dominio)") || "";
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "application/pdf,image/*";
                input.onchange = () => {
                  const f = input.files?.[0];
                  if (f) void uploadDoc(f, name);
                };
                input.click();
              }}
            >
              Agregar documento
            </button>
            <ul className="space-y-2 text-sm">
              {form.documents.map((d) => (
                <li
                  key={d.url}
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2"
                >
                  <a
                    className="truncate text-sky-400 underline-offset-2 transition-colors hover:text-sky-300 hover:underline"
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {d.name}
                  </a>
                  <button
                    type="button"
                    className="shrink-0 text-xs text-red-300 transition-colors hover:text-red-200"
                    onClick={() =>
                      setForm((f) => ({ ...f, documents: f.documents.filter((x) => x.url !== d.url) }))
                    }
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={saving || uploading}
          onClick={() => void save()}
          className="rv-btn-primary px-6 py-3 disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
