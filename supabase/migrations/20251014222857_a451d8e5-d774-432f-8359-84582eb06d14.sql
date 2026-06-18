-- Add CHECK constraints to enforce 5000 character limit on notes fields
-- This prevents bypassing client-side validation

ALTER TABLE public.assessment_submissions 
ADD CONSTRAINT assessment_notes_length_check 
CHECK (char_length(notes) <= 5000);

ALTER TABLE public.contact_submissions 
ADD CONSTRAINT contact_notes_length_check 
CHECK (char_length(notes) <= 5000);

COMMENT ON CONSTRAINT assessment_notes_length_check ON public.assessment_submissions 
IS 'Enforces maximum 5000 character limit on admin notes to prevent malicious large payloads';

COMMENT ON CONSTRAINT contact_notes_length_check ON public.contact_submissions 
IS 'Enforces maximum 5000 character limit on admin notes to prevent malicious large payloads';