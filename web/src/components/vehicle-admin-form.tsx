"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Vehicle } from "@/lib/vehicle-types";

const featureOptions = ["Aire", "Vidrios electricos", "Direccion"] as const;

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

export function VehicleAdminForm(props: Props) {
  const router = useRouter();
  const isEdit = props.mode === "edit";
  const vehicleId = isEdit ? props.initial.id : null;

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
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
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.set("vehicleId", vehicleId);
        fd.set("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
        if (!res.ok || !data.url) throw new Error(data.error || `Falló la subida de ${file.name}`);
        uploadedUrls.push(data.url);
      }
      const nextPhotos = [...form.photos, ...uploadedUrls];
      setForm((f) => ({ ...f, photos: nextPhotos }));
      await persistMedia({ photos: nextPhotos });
      setNotice(
        uploadedUrls.length > 1
          ? `${uploadedUrls.length} fotos subidas y guardadas.`
          : "Foto subida y guardada.",
      );
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
    <div className="space-y-6">
      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {notice}
        </p>
      ) : null}

      {isEdit ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Enlace para clientes</h2>
          <p className="mt-1 text-xs text-slate-600">
            Compartí esta URL en Instagram, WhatsApp o donde quieras. Solo se muestra si el vehículo
            está publicado.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <code className="break-all rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-800">
              {shareUrl}
            </code>
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              onClick={() => void navigator.clipboard.writeText(shareUrl)}
            >
              Copiar
            </button>
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">Datos del vehículo</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-slate-700">
            Marca
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Modelo
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.model}
              onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Año
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.year}
              onChange={(e) => setForm((f) => ({ ...f, year: Number(e.target.value) }))}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Kilometraje (km)
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.mileageKm}
              onChange={(e) => setForm((f) => ({ ...f, mileageKm: e.target.value }))}
              placeholder="Opcional"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Combustible
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.fuel}
              onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))}
              placeholder="Nafta, diésel, híbrido…"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Caja
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.transmission}
              onChange={(e) => setForm((f) => ({ ...f, transmission: e.target.value }))}
              placeholder="Manual, automática…"
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Color
            <input
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.color}
              onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
            />
          </label>
          <label className="block text-xs font-medium text-slate-700">
            Precio
            <input
              type="number"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="Opcional"
            />
          </label>
          <div className="block text-xs font-medium text-slate-700">
            Moneda
            <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
              USD (dólares)
            </div>
          </div>
          </div>

          <fieldset className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            Checklist de equipamiento
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {featureOptions.map((feature) => (
              <label key={feature} className="flex items-center gap-2 text-sm text-slate-800">
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

          <label className="block text-xs font-medium text-slate-700">
          Slug de URL (opcional)
          <input
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
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

          <label className="flex items-center gap-2 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Publicado (visible para clientes)
          </label>

          <label className="block text-xs font-medium text-slate-700">
          Descripción
          <textarea
            className="mt-1 min-h-[120px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          </label>

          <label className="block text-xs font-medium text-slate-700">
          Destacados (uno por línea)
          <textarea
            className="mt-1 min-h-[80px] w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            value={form.highlightsText}
            onChange={(e) => setForm((f) => ({ ...f, highlightsText: e.target.value }))}
            placeholder={"Airbags\nÚnico dueño\nService oficial…"}
          />
          </label>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Fotos</h2>
            <p className="text-xs text-slate-600">
              {isEdit
                ? "Subí todas las imágenes que quieras; se guardan automáticamente."
                : "Guardá el vehículo primero para habilitar la subida de fotos."}
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={!vehicleId || uploading}
              onChange={(e) => {
                const selected = Array.from(e.target.files || []);
                e.target.value = "";
                if (selected.length) void uploadFiles(selected);
              }}
              className="block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm"
            />
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {form.photos.map((url, index) => (
                <li key={`${url}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  {imageErrors[url] ? (
                    <div className="flex aspect-[4/3] items-center justify-center px-3 text-center text-xs text-slate-500">
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
                    className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white"
                    onClick={() => void removePhoto(url)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
            <h2 className="text-sm font-semibold text-slate-900">Documentación</h2>
            <p className="text-xs text-slate-600">PDF o imágenes (seguro, informe, título, etc.).</p>
            <button
              type="button"
              disabled={!vehicleId || uploading}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
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
                  className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2"
                >
                  <a className="truncate text-sky-700 underline" href={d.url} target="_blank" rel="noreferrer">
                    {d.name}
                  </a>
                  <button
                    type="button"
                    className="shrink-0 text-xs text-red-700"
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
          className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
