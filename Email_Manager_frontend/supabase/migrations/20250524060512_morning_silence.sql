/*
  # IMAP Credentials Schema

  1. New Tables
    - `imap_credentials`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `email` (text)
      - `password` (text, encrypted)
      - `host` (text)
      - `port` (integer)
      - `use_ssl` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `imap_credentials` table
    - Add policy for authenticated users to manage their own credentials
*/

CREATE TABLE IF NOT EXISTS imap_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  host text NOT NULL,
  port integer NOT NULL,
  use_ssl boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, email)
);

ALTER TABLE imap_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own credentials"
  ON imap_credentials
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update the updated_at column
CREATE TRIGGER update_imap_credentials_updated_at
  BEFORE UPDATE ON imap_credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();