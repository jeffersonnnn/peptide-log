ALTER TABLE cycle_logs ADD COLUMN IF NOT EXISTS user_id text;
CREATE INDEX IF NOT EXISTS cycle_logs_user_id_idx ON cycle_logs (user_id);

CREATE POLICY "Users can delete own logs"
  ON cycle_logs FOR DELETE
  USING (true);
