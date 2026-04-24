# RV Automóviles — proyecto

La aplicación web (Next.js, PWA, panel admin, **catálogo público** y **ficha por enlace** `/v/slug`) está disponible en la **raíz del repo** para simplificar deploy en Vercel.

## Qué incluye la interfaz

| Área | Rutas | Función |
|------|--------|---------|
| **Clientes** | `/`, `/catalogo`, `/v/[slug]` | Inicio, listado de publicados, ficha con fotos/datos/docs y **copiar enlace** para redes. Navegación móvil inferior (Inicio · Autos · Staff). |
| **Automotora** | `/admin/...` | Alta/edición/baja de vehículos, fotos, documentación, publicado/borrador, slug y enlace público. |

## Desarrollo local

```bash
cd web
npm install
cp .env.example .env.local
```

Mínimo local: **`ADMIN_PASSWORD`** y **`SESSION_SECRET`**. Sin Postgres, los datos van a `web/data/vehicles.json`; sin Blob, los archivos a `web/public/uploads/`.

```bash
npm run dev
```

## Neon (Postgres)

1. En [Neon](https://neon.tech) o desde **Vercel → Storage → Create Database → Postgres**, creá una base y copiá la URL.
2. Pegá **`DATABASE_URL`** (o la variable que te dé Vercel: **`POSTGRES_URL`**, **`POSTGRES_PRISMA_URL`**) en variables de entorno. La app usa **una** de las tres.
3. Para muchas conexiones serverless, usá la URL **con pooler** (el host suele contener `-pooler`). [Documentación de pooling en Neon](https://neon.tech/docs/connect/connection-pooling).
4. El SQL listo para pegar en el **SQL Editor de Neon** está en **`web/db/neon/init.sql`** (copia idéntica en `001-vehicle-store.sql`). La app **también crea la tabla sola** al primer uso; el script sirve si querés tener el esquema creado a mano.

## Deploy en Vercel

1. **Add New Project** → repo **RVAutomoviles**.
2. **Root Directory**: dejar por defecto (vacío) para usar la raíz del repo.
3. Variables de entorno: ver **`web/.env.example`** y la tabla abajo.
4. **Storage → Postgres (Neon)** y **Storage → Blob**, conectados al proyecto.
5. Deploy.
6. Validación rápida post-deploy:
   - `https://TU_URL/` debe abrir inicio.
   - `https://TU_URL/catalogo` debe abrir catálogo (aunque esté vacío).
   - `https://TU_URL/api/health` debe devolver JSON con `ok: true`.

### Si Vercel dice "All checks have failed"

1. Confirmá que el proyecto en Vercel tenga **Root Directory = `web`**.
2. En **Settings → Build & Development Settings**, dejá:
   - Framework Preset: **Next.js**
   - Build Command: vacío (default)
   - Output Directory: vacío (default)
3. Redeploy con **Clear build cache**.
4. Si sigue fallando, revisá el log de la check "Vercel" (no GitHub Actions): suele indicar variable faltante o root directory incorrecto.

## Variables de entorno (resumen)

| Variable | Obligatoria en Vercel | Notas |
|----------|----------------------|--------|
| `ADMIN_PASSWORD` | Sí | Contraseña del panel. |
| `SESSION_SECRET` | Sí | Secreto largo para la cookie de admin. |
| `DATABASE_URL` / `POSTGRES_URL` / `POSTGRES_PRISMA_URL` | Sí (producción) | Al menos **una** con la URL de Neon. |
| `BLOB_READ_WRITE_TOKEN` | Sí (si subís archivos) | Token del Blob Store en Vercel. |
| `NEXT_PUBLIC_APP_URL` | No | URL pública fija; si falta, se usa `VERCEL_URL`. |

`VERCEL_URL` la define Vercel automáticamente.

### Diagnóstico rápido de producción

- `GET /api/health` devuelve:
  - `env`: `vercel` o `local`
  - `storage`: `postgres` o `filesystem`
  - `hasBlob`: `true/false`
- Si en Vercel ves `storage: filesystem`, faltan variables de Postgres (`DATABASE_URL`, `POSTGRES_URL` o `POSTGRES_PRISMA_URL`).

## Ejemplo de valores (copiar y adaptar)

Usá **estos dos literales** si querés algo rápido para probar (cambiá en producción):

```env
ADMIN_PASSWORD=RvAutos2026_Demo_Clave
SESSION_SECRET=9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8
```

**No podés inventar** `DATABASE_URL` ni `BLOB_READ_WRITE_TOKEN`: copialos del dashboard de Vercel/Neon cuando crees los recursos. Formato típico:

```env
DATABASE_URL=postgresql://USUARIO:CLAVE@ep-xxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Opcional:

```env
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```
