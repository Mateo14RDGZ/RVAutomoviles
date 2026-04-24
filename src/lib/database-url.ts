/**
 * URL de Postgres para Neon / Vercel Postgres.
 * En Vercel, suele existir al menos una de estas variables al enlazar Storage.
 * Preferí la cadena **pooled** (suele incluir `-pooler` en el host) para serverless.
 *
 * @see https://neon.tech/docs/connect/connection-pooling
 */
export function resolveDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL
  );
}
