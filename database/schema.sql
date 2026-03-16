-- Database schema scaffold for the Global Nautical Export Portal.

CREATE TABLE IF NOT EXISTS vessel_positions (
  vessel_id INTEGER NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  recorded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS advisor_recommendations (
  id SERIAL PRIMARY KEY,
  country VARCHAR(100) NOT NULL,
  score NUMERIC(4, 3) NOT NULL,
  expected_volume INTEGER NOT NULL,
  confidence VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
