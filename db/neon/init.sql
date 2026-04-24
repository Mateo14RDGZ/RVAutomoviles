-- =============================================================================
-- RV Automóviles — script para Neon (SQL Editor)
-- Ejecutá todo el bloque una vez. La app también crea esto solo si falta.
-- =============================================================================

CREATE TABLE IF NOT EXISTS vehicle_store (
  id smallint PRIMARY KEY,
  payload text NOT NULL
);

COMMENT ON TABLE vehicle_store IS 'JSON del catálogo: {"vehicles":[...]}';

INSERT INTO vehicle_store (id, payload)
VALUES (1, '{"vehicles":[]}')
ON CONFLICT (id) DO NOTHING;
