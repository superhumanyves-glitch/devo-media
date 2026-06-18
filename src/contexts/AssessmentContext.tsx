import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Input validation schema
export const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  company: z.string().trim().min(1, { message: "Company cannot be empty" }).max(100, { message: "Company must be less than 100 characters" }),
  phone: z.string().trim().max(20, { message: "Phone must be less than 20 characters" }).optional(),
});

export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  phone?: string;
}

export interface Answers {
  [key: string]: string;
}

export interface AssessmentState {
  contactInfo: ContactInfo | null;
  answers: Answers;
  score: number;
  segment: 'high' | 'medium' | 'low' | null;
}

interface AssessmentContextType {
  state: AssessmentState;
  setContactInfo: (info: ContactInfo) => void;
  setAnswer: (questionId: string, answer: string) => void;
  calculateScore: () => number;
  getSegment: (score: number) => 'high' | 'medium' | 'low';
  resetAssessment: () => void;
  submitToDatabase: () => Promise<{ success: boolean; error?: string }>;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const initialState: AssessmentState = {
  contactInfo: null,
  answers: {},
  score: 0,
  segment: null,
};

export const AssessmentProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AssessmentState>(() => {
    // Use sessionStorage instead of localStorage for better security
    // Data is automatically cleared when browser tab closes
    const saved = sessionStorage.getItem('devo-assessment');
    return saved ? JSON.parse(saved) : initialState;
  });

  // Save to sessionStorage whenever state changes
  React.useEffect(() => {
    sessionStorage.setItem('devo-assessment', JSON.stringify(state));
  }, [state]);

  const setContactInfo = (info: ContactInfo) => {
    setState(prev => ({ ...prev, contactInfo: info }));
  };

  const setAnswer = (questionId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  };

  const calculateScore = () => {
    let score = 0;
    const { answers } = state;

    // Q1: Post je momenteel regelmatig video content
    if (answers.q1 === 'option1') score += 10;
    else if (answers.q1 === 'option2') score += 5;

    // Q2: Heb je een content strategie
    if (answers.q2 === 'option1') score += 10;
    else if (answers.q2 === 'option2') score += 5;

    // Q3: Meet je de prestaties
    if (answers.q3 === 'option1') score += 10;
    else if (answers.q3 === 'option2') score += 5;

    // Q4: Duidelijke doelgroep
    if (answers.q4 === 'option1') score += 10;
    else if (answers.q4 === 'option2') score += 5;

    // Q5: Tijd besteed aan video creatie
    if (answers.q5 === 'option1') score += 10;
    else if (answers.q5 === 'option2') score += 7;
    else if (answers.q5 === 'option3') score += 3;

    // Q6: Professionele equipment
    if (answers.q6 === 'option1') score += 10;
    else if (answers.q6 === 'option2') score += 5;

    // Q7: Verantwoordelijke voor content
    if (answers.q7 === 'option1') score += 10;
    else if (answers.q7 === 'option2') score += 5;

    setState(prev => ({ ...prev, score }));
    return score;
  };

  const getSegment = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 50) return 'high';
    if (score >= 25) return 'medium';
    return 'low';
  };

  const resetAssessment = () => {
    setState(initialState);
    sessionStorage.removeItem('devo-assessment');
  };

  const submitToDatabase = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate contact info
      if (!state.contactInfo) {
        return { success: false, error: 'Contact information is missing' };
      }

      const validatedContact = contactSchema.parse(state.contactInfo);

      // Import lead qualification utilities
      const { decodeAssessmentAnswers, qualifyLead } = await import('@/lib/leadUtils');
      
      // Decode and qualify the lead
      const decoded = decodeAssessmentAnswers(state.answers);
      const qualification = qualifyLead(decoded);

      // Insert into database with qualification data
      const { error } = await supabase
        .from('assessment_submissions')
        .insert({
          name: validatedContact.name,
          email: validatedContact.email,
          company: validatedContact.company,
          phone: validatedContact.phone || null,
          answers: state.answers,
          score: state.score,
          segment: state.segment || 'low',
          persona_type: qualification.personaType,
          readiness_score: qualification.readinessScore,
          budget_indicator: qualification.budgetIndicator,
          urgency_level: qualification.urgency,
          service_matches: qualification.serviceMatches,
          conversion_probability: qualification.conversionProbability,
          recommended_package: qualification.recommendedPackage,
          recommended_approach: qualification.recommendedApproach,
        });

      if (error) {
        if (import.meta.env.DEV) {
          console.error('Database submission error:', error);
        }
        return { success: false, error: error.message };
      }

      // Send emails via edge function (don't block on email errors)
      try {
        const { error: emailError } = await supabase.functions.invoke('send-assessment-email', {
          body: {
            name: validatedContact.name,
            company: validatedContact.company,
            email: validatedContact.email,
            phone: validatedContact.phone || '',
            score: state.score,
            segment: state.segment || 'low',
            answers: state.answers,
            decodedAnswers: decoded,
          },
        });
        
        if (emailError) {
          console.error('Email sending failed:', emailError);
        }
      } catch (emailError) {
        console.error('Email function error:', emailError);
      }

      // Clear sensitive data from sessionStorage after successful submission
      sessionStorage.removeItem('devo-assessment');
      
      return { success: true };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: 'Invalid contact information' };
      }
      if (import.meta.env.DEV) {
        console.error('Unexpected error during submission:', error);
      }
      return { success: false, error: 'Failed to save assessment data' };
    }
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        setContactInfo,
        setAnswer,
        calculateScore,
        getSegment,
        resetAssessment,
        submitToDatabase,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};
