-- Add new columns to assessment_submissions for advanced lead qualification
ALTER TABLE assessment_submissions 
ADD COLUMN IF NOT EXISTS persona_type TEXT,
ADD COLUMN IF NOT EXISTS readiness_score INTEGER,
ADD COLUMN IF NOT EXISTS budget_indicator TEXT,
ADD COLUMN IF NOT EXISTS urgency_level TEXT,
ADD COLUMN IF NOT EXISTS service_matches JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS conversion_probability TEXT,
ADD COLUMN IF NOT EXISTS recommended_package TEXT,
ADD COLUMN IF NOT EXISTS recommended_approach TEXT;