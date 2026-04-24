# RV Automóviles — proyecto

La aplicación web (Next.js, PWA, panel admin y fichas públicas) está en la carpeta **`web/`**.

## Desarrollo

```bash
cd web
npm install
cp .env.example .env.local
# Editar .env.local: ADMIN_PASSWORD, SESSION_SECRET
npm run dev
```

Despliegue: configurá el **directorio raíz del proyecto** en tu hosting como `web` (por ejemplo en Vercel: *Root Directory* → `web`).
