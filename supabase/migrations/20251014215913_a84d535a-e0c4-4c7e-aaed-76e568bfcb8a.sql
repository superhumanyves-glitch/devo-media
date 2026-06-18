-- Add DELETE policies for assessment_submissions and contact_submissions tables
-- These policies ensure only admins can delete submission records

-- Policy for assessment_submissions
CREATE POLICY "Only admins can delete assessment submissions"
ON public.assessment_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy for contact_submissions
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add length constraints to notes fields to prevent DoS
-- Maximum 5000 characters for notes fields
ALTER TABLE public.assessment_submissions 
ADD CONSTRAINT assessment_notes_length CHECK (length(notes) <= 5000 OR notes IS NULL);

ALTER TABLE public.contact_submissions 
ADD CONSTRAINT contact_notes_length CHECK (length(notes) <= 5000 OR notes IS NULL);