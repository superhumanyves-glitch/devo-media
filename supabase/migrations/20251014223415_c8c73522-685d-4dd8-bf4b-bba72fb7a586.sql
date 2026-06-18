-- Fix RLS policies to allow public submissions
-- Change from RESTRICTIVE to PERMISSIVE for INSERT operations

DROP POLICY IF EXISTS "Anyone can submit assessments" ON public.assessment_submissions;
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;

-- Create PERMISSIVE policies for public inserts
CREATE POLICY "Anyone can submit assessments" 
ON public.assessment_submissions 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
TO public
WITH CHECK (true);