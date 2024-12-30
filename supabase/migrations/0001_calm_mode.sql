/*
  # Employee and Work Metrics Schema

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `role` (text)
      - `start_date` (date)
      - `clockify_id` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `work_metrics`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, references employees)
      - `date` (date)
      - `hours_worked` (numeric)
      - `project` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text NOT NULL,
  start_date date NOT NULL,
  clockify_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create work_metrics table
CREATE TABLE IF NOT EXISTS work_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id),
  date date NOT NULL,
  hours_worked numeric NOT NULL,
  project text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Employees are viewable by authenticated users" ON employees
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Work metrics are viewable by authenticated users" ON work_metrics
  FOR SELECT TO authenticated USING (true);

-- Create updated_at trigger for employees
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();