-- Create assessment_submissions table
CREATE TABLE public.assessment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'contacted', 'converted', 'closed'))
);

-- Enable Row Level Security
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (submit assessments)
CREATE POLICY "Anyone can submit assessments"
ON public.assessment_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Only allow reading for authenticated users (for future admin dashboard)
CREATE POLICY "Authenticated users can view all submissions"
ON public.assessment_submissions
FOR SELECT
TO authenticated
USING (true);

-- Create index for faster queries
CREATE INDEX idx_assessment_submissions_created_at ON public.assessment_submissions(created_at DESC);
CREATE INDEX idx_assessment_submissions_segment ON public.assessment_submissions(segment);
CREATE INDEX idx_assessment_submissions_status ON public.assessment_submissions(status);