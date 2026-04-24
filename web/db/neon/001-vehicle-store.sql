-- Esquema esperado por la app para guardar el catálogo en Postgres (Neon).
-- La app también crea la tabla al vuelo si no existe; podés ejecutar este SQL
-- desde el SQL Editor de Neon para tener todo explícito.

CREATE TABLE IF NOT EXISTS vehicle_store (
  id smallint PRIMARY KEY,
  payload text NOT NULL
);

INSERT INTO vehicle_store (id, payload)
VALUES (1, '{"vehicles":[]}')
ON CONFLICT (id) DO NOTHING;
