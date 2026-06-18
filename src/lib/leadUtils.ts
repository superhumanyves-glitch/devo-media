// Utility functions for lead management and assessment decoding

export interface DecodedAssessment {
  // Original properties
  contentMaturity: string;
  contentMaturityLevel: "high" | "medium" | "low";
  hasStrategy: string;
  measuresPerformance: string;
  targetAudience: string;
  targetAudienceLevel: "high" | "medium" | "low";
  timeInvestment: string;
  equipment: string;
  teamStructure: string;
  companySize: string;
  companySizeCategory: "solo" | "small" | "growing" | "established";
  primaryGoal: string;
  primaryChallenge: string;
  preferredSolution: string;
  droneInterest: string;
  droneInterestLevel: "high" | "medium" | "low" | "none";
  websiteStatus: string;
  websiteNeedLevel: "high" | "medium" | "low" | "none";
  specialRequest?: string;
  
  // Email-friendly properties (human-readable answers for all 13 questions)
  currentVideoUsage: string; // Q1
  hasContentPlan: string; // Q2
  postingFrequency: string; // Q3 (was measuresPerformance)
  videoFormats: string; // Q4 (was targetAudience)
  teamSize: string; // Q5 (was timeInvestment)
  externalPartners: string; // Q6 (was equipment)
  videoBudget: string; // Q7 (was teamStructure)
  platforms: string; // Q8 (was companySize)
  biggestChallenge: string; // Q10
}

export interface LeadQualification {
  personaType: string;
  readinessScore: number;
  budgetIndicator: "high" | "medium" | "low";
  urgency: "immediate" | "short-term" | "long-term";
  serviceMatches: string[];
  conversionProbability: "high" | "medium" | "low";
  recommendedPackage: string;
  recommendedApproach: string;
}

export interface PersonaRecommendations {
  persona: string;
  description: string;
  recommendations: string[];
  packageSuggestion: {
    primary: string;
    alternative: string;
    reasoning: string;
  };
  urgency: string;
  talkingPoints: string[];
}

export function decodeAssessmentAnswers(answers: any): DecodedAssessment {
  return {
    // Q1: Content posting frequency
    contentMaturity: 
      answers.q1 === "option1" ? "Post 3x per week" :
      answers.q1 === "option2" ? "Post inconsistent" : 
      "Nog nooit video content gepost",
    contentMaturityLevel:
      answers.q1 === "option1" ? "high" :
      answers.q1 === "option2" ? "medium" : "low",
    currentVideoUsage:
      answers.q1 === "option1" ? "Ja, minstens 3x per week" :
      answers.q1 === "option2" ? "Ja, maar niet vaak (1-2x per maand)" :
      "Nee, nog nooit gedaan",
    
    // Q2: Content strategy
    hasStrategy:
      answers.q2 === "option1" ? "Volledig uitgewerkte strategie" :
      answers.q2 === "option2" ? "Ad-hoc strategie" :
      "Nog geen strategie",
    hasContentPlan:
      answers.q2 === "option1" ? "Ja, alles staat gepland" :
      answers.q2 === "option2" ? "Soms, als ik tijd heb" :
      "Nee, ik wil hulp met een plan",
    
    // Q3: Performance measurement
    measuresPerformance:
      answers.q3 === "option1" ? "Meet alle KPI's" :
      answers.q3 === "option2" ? "Bekijkt soms views" :
      "Nooit gemeten",
    postingFrequency:
      answers.q3 === "option1" ? "Ja, ik bekijk alle cijfers" :
      answers.q3 === "option2" ? "Soms kijk ik naar views en likes" :
      "Nee, weet niet hoe",
    
    // Q4: Target audience
    targetAudience:
      answers.q4 === "option1" ? "Zeer specifieke doelgroep" :
      answers.q4 === "option2" ? "Algemeen idee" :
      "Niet gedefinieerd",
    targetAudienceLevel:
      answers.q4 === "option1" ? "high" :
      answers.q4 === "option2" ? "medium" : "low",
    videoFormats:
      answers.q4 === "option1" ? "Ja, heel specifiek" :
      answers.q4 === "option2" ? "Een beetje, niet heel gedetailleerd" :
      "Nee, wil een brede groep bereiken",
    
    // Q5: Time investment
    timeInvestment:
      answers.q5 === "option1" ? "10+ uur/maand" :
      answers.q5 === "option2" ? "5-10 uur/maand" :
      answers.q5 === "option3" ? "Minder dan 5 uur" :
      "Geen tijd beschikbaar",
    teamSize:
      answers.q5 === "option1" ? "Meer dan 10 uur" :
      answers.q5 === "option2" ? "5-10 uur" :
      answers.q5 === "option3" ? "Minder dan 5 uur" :
      "0 uur - geen tijd",
    
    // Q6: Equipment
    equipment:
      answers.q6 === "option1" ? "Professionele apparatuur" :
      answers.q6 === "option2" ? "Smartphone/basis camera" :
      "Geen apparatuur",
    externalPartners:
      answers.q6 === "option1" ? "Professionele camera en apparatuur" :
      answers.q6 === "option2" ? "Smartphone" :
      "Ik heb niks",
    
    // Q7: Team structure
    teamStructure:
      answers.q7 === "option1" ? "Dedicated content persoon" :
      answers.q7 === "option2" ? "Gedeelde verantwoordelijkheid" :
      "Niemand toegewezen",
    videoBudget:
      answers.q7 === "option1" ? "Iemand die zich hier fulltime mee bezig houdt" :
      answers.q7 === "option2" ? "Meerdere mensen af en toe" :
      "Ik doe het zelf erbij",
    
    // Q8: Company size
    companySize:
      answers.q8 === "solo" ? "Solo ondernemer" :
      answers.q8 === "small" ? "Klein team (2-10)" :
      answers.q8 === "growing" ? "Groeiend bedrijf (10-50)" :
      "Gevestigd bedrijf (50+)",
    companySizeCategory: answers.q8 || "small",
    platforms:
      answers.q8 === "solo" ? "Alleen ikzelf (ZZP'er)" :
      answers.q8 === "small" ? "Klein team (2-10 mensen)" :
      answers.q8 === "growing" ? "Groeiend (10-50 mensen)" :
      "Groot bedrijf (50+ mensen)",
    
    // Q9: Primary goal
    primaryGoal:
      answers.q9 === "awareness" ? "Bekendheid - meer mensen moeten ons kennen" :
      answers.q9 === "leads" ? "Leads - meer potentiële klanten" :
      answers.q9 === "retention" ? "Klantbinding - betere relatie met klanten" :
      answers.q9 === "explanation" ? "Uitleg - duidelijk maken wat we doen" :
      "Personeel - goede mensen aantrekken",
    
    // Q10: Primary challenge
    primaryChallenge:
      answers.q10 === "time" ? "Geen tijd" :
      answers.q10 === "ideas" ? "Geen ideeën" :
      answers.q10 === "budget" ? "Te duur" :
      answers.q10 === "quality" ? "Ziet er niet goed uit" :
      "Zie geen resultaten",
    biggestChallenge:
      answers.q10 === "time" ? "Geen tijd" :
      answers.q10 === "ideas" ? "Geen ideeën" :
      answers.q10 === "budget" ? "Te duur" :
      answers.q10 === "quality" ? "Ziet er niet goed uit" :
      "Zie geen resultaten",
    
    // Q11: Preferred solution
    preferredSolution:
      answers.q11 === "monthly" ? "Maandelijks - vaste content" :
      answers.q11 === "project" ? "Per project - flexibel" :
      answers.q11 === "onetime" ? "Eenmalig - voor een event" :
      "Alles uitbesteden",
    
    // Q12: Drone interest
    droneInterest:
      answers.q12 === "very" ? "Ja, zeker" :
      answers.q12 === "maybe" ? "Misschien, wil eerst voorbeelden zien" :
      answers.q12 === "no" ? "Nee, niet relevant" :
      "Weet niet wat dat kan betekenen",
    droneInterestLevel:
      answers.q12 === "very" ? "high" :
      answers.q12 === "maybe" ? "medium" :
      answers.q12 === "unknown" ? "low" : "none",
    
    // Q13: Website status
    websiteStatus:
      answers.q13 === "modern" ? "Ja, een moderne website" :
      answers.q13 === "outdated" ? "Ja, maar moet vernieuwd worden" :
      answers.q13 === "none" ? "Nee, heb er nog geen" :
      "Ja, maar wil video's toevoegen",
    websiteNeedLevel:
      answers.q13 === "none" ? "high" :
      answers.q13 === "outdated" ? "high" :
      answers.q13 === "integrate" ? "medium" : "none",
    
    // Q14: Special request
    specialRequest: answers.q14 || undefined,
  };
}

export function calculateLeadPriority(score: number, segment: string): {
  level: "high" | "medium" | "low";
  color: string;
  label: string;
} {
  // All leads are treated as equally valuable
  return {
    level: "high",
    color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    label: "Valuable Lead"
  };
}

export function detectUrgencyKeywords(message: string): boolean {
  const urgentKeywords = [
    "snel", "urgent", "dringend", "vandaag", "morgen", "asap",
    "zo spoedig mogelijk", "deadline", "haast", "spoed"
  ];
  
  return urgentKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
}

export function recommendNextAction(lead: any, type: "assessment" | "contact"): string {
  if (type === "assessment") {
    // All assessment leads get uniform guidance
    return "Schedule initial consultation to discuss video needs";
  } else {
    const hasUrgency = detectUrgencyKeywords(lead.message || "");
    if (hasUrgency) {
      return "Urgent request detected - Contact immediately";
    }
    if (lead.work_types && lead.work_types.length >= 3) {
      return "Multiple services requested - Schedule consultation";
    }
    return "Send introductory email and quote";
  }
}

export function getRecommendedPackage(decoded: DecodedAssessment): {
  package: string;
  reason: string;
} {
  if (decoded.preferredSolution.includes("Monthly")) {
    return {
      package: "Professional Package",
      reason: "Based on preference for consistent content flow"
    };
  } else if (decoded.preferredSolution.includes("Fully managed")) {
    return {
      package: "Full Service Package",
      reason: "Needs complete video + social media management"
    };
  } else if (decoded.preferredSolution.includes("One-time")) {
    return {
      package: "Premium Single Production",
      reason: "Large one-time production requested"
    };
  } else {
    return {
      package: "Flexible Project-Based",
      reason: "Prefers flexibility over commitment"
    };
  }
}

// Calculate readiness score based on multiple factors
export function calculateReadinessScore(decoded: DecodedAssessment): number {
  let score = 0;
  
  // Content maturity (0-25 points)
  score += decoded.contentMaturityLevel === "high" ? 25 : 
           decoded.contentMaturityLevel === "medium" ? 15 : 5;
  
  // Strategy & measurement (0-25 points)
  if (decoded.hasStrategy.includes("Fully documented")) score += 15;
  else if (decoded.hasStrategy.includes("Ad-hoc")) score += 8;
  
  if (decoded.measuresPerformance.includes("Tracks all")) score += 10;
  else if (decoded.measuresPerformance.includes("Sometimes")) score += 5;
  
  // Target audience clarity (0-20 points)
  score += decoded.targetAudienceLevel === "high" ? 20 :
           decoded.targetAudienceLevel === "medium" ? 10 : 0;
  
  // Resources (0-30 points)
  if (decoded.timeInvestment.includes("10+")) score += 10;
  else if (decoded.timeInvestment.includes("5-10")) score += 7;
  else if (decoded.timeInvestment.includes("Less than 5")) score += 3;
  
  if (decoded.equipment.includes("Professional")) score += 10;
  else if (decoded.equipment.includes("Smartphone")) score += 5;
  
  if (decoded.teamStructure.includes("Dedicated")) score += 10;
  else if (decoded.teamStructure.includes("Shared")) score += 5;
  
  // Drone interest (0-10 points) - cross-selling opportunity
  if (decoded.droneInterestLevel === "high") score += 10;
  else if (decoded.droneInterestLevel === "medium") score += 5;
  else if (decoded.droneInterestLevel === "low") score += 2;
  
  // Website need (0-10 points) - additional service opportunity
  if (decoded.websiteNeedLevel === "high") score += 10;
  else if (decoded.websiteNeedLevel === "medium") score += 5;
  
  return score;
}

// Determine budget indicator based on company size and challenges
export function determineBudgetIndicator(decoded: DecodedAssessment): "high" | "medium" | "low" {
  if (decoded.primaryChallenge.includes("Limited budget")) return "low";
  
  if (decoded.companySizeCategory === "established") return "high";
  if (decoded.companySizeCategory === "growing") return "high";
  if (decoded.companySizeCategory === "small") return "medium";
  return "low"; // solo
}

// Assess urgency based on goals and challenges
export function assessUrgency(decoded: DecodedAssessment): "immediate" | "short-term" | "long-term" {
  // High urgency indicators
  if (decoded.primaryChallenge.includes("No measurable results") ||
      decoded.primaryChallenge.includes("No time to create")) {
    return "immediate";
  }
  
  // Medium urgency
  if (decoded.primaryGoal.includes("More leads") ||
      decoded.primaryGoal.includes("Better client retention")) {
    return "short-term";
  }
  
  // Long-term planning
  return "long-term";
}

// Match services based on goals and challenges
export function matchServices(decoded: DecodedAssessment): string[] {
  const services: string[] = [];
  
  // Goal-based services
  if (decoded.primaryGoal.includes("Brand awareness")) {
    services.push("Social Media Content", "Brand Story Videos");
  }
  if (decoded.primaryGoal.includes("More leads")) {
    services.push("Lead Generation Videos", "Landing Page Videos");
  }
  if (decoded.primaryGoal.includes("Better client retention")) {
    services.push("Client Success Stories", "Newsletter Video Content");
  }
  if (decoded.primaryGoal.includes("Product/service explanation")) {
    services.push("Explainer Videos", "Product Demos");
  }
  if (decoded.primaryGoal.includes("Recruitment")) {
    services.push("Employer Branding", "Culture Videos");
  }
  
  // Challenge-based services
  if (decoded.primaryChallenge.includes("No time")) {
    services.push("Monthly Packages", "Full Service");
  }
  if (decoded.primaryChallenge.includes("Don't know what to make")) {
    services.push("Strategy Session", "Content Planning");
  }
  if (decoded.primaryChallenge.includes("Limited budget")) {
    services.push("Starter Package", "ROI-focused approach");
  }
  if (decoded.primaryChallenge.includes("Inconsistent quality")) {
    services.push("Professional Production", "Brand Guidelines");
  }
  if (decoded.primaryChallenge.includes("No measurable results")) {
    services.push("Performance Tracking", "Analytics Package");
  }
  
  // Drone interest services
  if (decoded.droneInterestLevel === "high") {
    services.push("Drone Content", "Aerial Photography");
  } else if (decoded.droneInterestLevel === "medium") {
    services.push("Drone Content (Optional)");
  }
  
  // Website services
  if (decoded.websiteNeedLevel === "high") {
    if (decoded.websiteStatus.includes("Geen website")) {
      services.push("Website Development", "Complete Digital Solution");
    } else if (decoded.websiteStatus.includes("Gedateerde")) {
      services.push("Website Redesign", "Website Modernization");
    }
  } else if (decoded.websiteNeedLevel === "medium") {
    services.push("Video + Website Integration");
  }
  
  return [...new Set(services)]; // Remove duplicates
}

// Bepaal persona type
export function determinePersona(decoded: DecodedAssessment): string {
  const readinessScore = calculateReadinessScore(decoded);
  
  // Klaar om te Schalen
  if (readinessScore >= 70 &&
      (decoded.companySizeCategory === "growing" || decoded.companySizeCategory === "established")) {
    return "Klaar om te Schalen";
  }
  
  // Volledig Uitbesteden
  if (decoded.preferredSolution.includes("Fully managed") &&
      decoded.primaryChallenge.includes("No time")) {
    return "Volledig Uitbesteden";
  }
  
  // Inconsistente Creator
  if (decoded.contentMaturityLevel === "medium" &&
      decoded.hasStrategy.includes("Ad-hoc") &&
      decoded.primaryChallenge.includes("No time")) {
    return "Inconsistente Creator";
  }
  
  // Flexibel Per Project
  if (decoded.preferredSolution.includes("project") ||
      decoded.preferredSolution.includes("One-time")) {
    return "Flexibel Per Project";
  }
  
  // Budget Bewust
  if (decoded.primaryChallenge.includes("Limited budget") ||
      (decoded.companySizeCategory === "solo" && determineBudgetIndicator(decoded) === "low")) {
    return "Budget Bewust";
  }
  
  // Ambitieuze Starter (default for low maturity)
  if (decoded.contentMaturityLevel === "low") {
    return "Ambitieuze Starter";
  }
  
  return "Algemene Prospect";
}

// Haal persona-specifieke aanbevelingen op
export function getPersonaRecommendations(persona: string, decoded: DecodedAssessment): PersonaRecommendations {
  const recommendationsMap: Record<string, PersonaRecommendations> = {
    "Klaar om te Schalen": {
      persona: "Klaar om te Schalen",
      description: "Je bent ervaren met content en klaar voor professionele groei",
      recommendations: [
        "Upgrade naar maandelijks contentplan (8-12 videos/maand)",
        "Video marketing strategie sessie",
        "Multi-platform distributie plan",
        "Performance analytics & optimization"
      ],
      packageSuggestion: {
        primary: "Professioneel Pakket (€2500-4000/maand)",
        alternative: "Full Service Pakket (€4000-6000/maand)",
        reasoning: "Op basis van je huidige content activiteit en groei ambities is een professioneel maandelijks pakket ideaal voor consistente, hoogwaardige output."
      },
      urgency: "Plan binnen 48 uur - sterke match voor jouw fase",
      talkingPoints: [
        `Je post al ${decoded.contentMaturity.toLowerCase()} - tijd om de kwaliteit te verhogen`,
        `Doel: ${decoded.primaryGoal} - focus op conversie-gedreven werk`,
        `Uitdaging: ${decoded.primaryChallenge} - maandelijks pakket lost dit op`,
        ...(decoded.droneInterestLevel === "high" ? ["🚁 Drone content interesse - perfect voor je scale-up fase"] : []),
        ...(decoded.websiteNeedLevel === "high" ? ["💻 Website opportunity - integreer video & web strategie"] : [])
      ]
    },
    "Volledig Uitbesteden": {
      persona: "Volledig Uitbesteden",
      description: "Jij wilt video én social media compleet uit handen geven",
      recommendations: [
        "Complete done-for-you video productie",
        "Social media management & planning",
        "Content strategie & implementatie",
        "Maandelijkse rapportage & optimalisatie"
      ],
      packageSuggestion: {
        primary: "Full Service Pakket (€4000-6000/maand)",
        alternative: "Professioneel Pakket (€2500-4000/maand)",
        reasoning: "Je geeft aan weinig tijd te hebben en volledige uitbesteding te willen - ons full service pakket neemt alles uit handen."
      },
      urgency: "Hoge prioriteit - je zoekt een directe oplossing",
      talkingPoints: [
        "Geen tijd: Wij nemen alles over",
        "Compleet beheerd: Video + social media in één pakket",
        `Doel: ${decoded.primaryGoal} - geïntegreerde aanpak voor maximaal resultaat`,
        ...(decoded.droneInterestLevel === "high" ? ["🚁 Drone content incluis in full service pakket"] : []),
        ...(decoded.websiteNeedLevel === "high" ? ["💻 Website integratie - één partner voor alles"] : [])
      ]
    },
    "Inconsistente Creator": {
      persona: "Inconsistente Creator",
      description: "Je post af en toe maar zoekt structuur en consistentie",
      recommendations: [
        "Vaste maandelijkse productie planning",
        "Content kalender & strategie",
        "Kwaliteitsverbetering workflow",
        "Template library voor snellere productie"
      ],
      packageSuggestion: {
        primary: "Maandelijks Pakket (€1500-2500/maand)",
        alternative: "Professioneel Pakket (€2500-4000/maand)",
        reasoning: "Een vast maandelijks ritme helpt je van ad-hoc naar consistente, professionele content te gaan."
      },
      urgency: "Los tijdgebrek op met vast maandelijks pakket",
      talkingPoints: [
        "Van inconsistent naar consistente posting",
        `Uitdaging: ${decoded.primaryChallenge} - maandelijks pakket lost dit op`,
        "Vaste planning = betere resultaten"
      ]
    },
    "Flexibel Per Project": {
      persona: "Flexibel Per Project",
      description: "Voorkeur voor flexibele project-gebaseerde samenwerking",
      recommendations: [
        "Per-project video productie",
        "Flexibele planning & uitvoering",
        "Specifieke campagne ondersteuning",
        "Eenmalige premium producties"
      ],
      packageSuggestion: {
        primary: "Flexibel Per Project (€500-2000 per project)",
        alternative: "Eenmalige Premium Productie (€2000-5000)",
        reasoning: "Project-gebaseerde aanpak geeft je de flexibiliteit die je zoekt zonder lange commitment."
      },
      urgency: "Stuur direct pricing & case studies",
      talkingPoints: [
        `Doel: ${decoded.primaryGoal} - bekijk relevante projecten`,
        "Flexibiliteit zonder verplichtingen",
        "Betaal per project"
      ]
    },
    "Budget Bewust": {
      persona: "Budget Bewust",
      description: "Prijsbewust maar wel geïnteresseerd in video content",
      recommendations: [
        "Start met een kleine starter package",
        "ROI-gerichte aanpak",
        "Flexibele betaalopties",
        "Groei mee met je budget"
      ],
      packageSuggestion: {
        primary: "Starter Pakket (€500-1000)",
        alternative: "Flexibel Per Project (€500-2000 per project)",
        reasoning: "Begin klein en bouw op - onze starter pakketten zijn ontworpen om direct ROI te leveren."
      },
      urgency: "Deel ROI case studies - bewijs de waarde",
      talkingPoints: [
        "Budget uitdaging - toon ROI voorbeelden",
        "Start klein, schaal later",
        "Flexibele betaalopties beschikbaar"
      ]
    },
    "Ambitieuze Starter": {
      persona: "Ambitieuze Starter",
      description: "Nieuw met video maar wel gemotiveerd om te beginnen",
      recommendations: [
        "Beginnersvriendelijke starter package",
        "Persoonlijke begeleiding & planning sessie",
        "Best practices en expert advies",
        "Stap-voor-stap implementatie"
      ],
      packageSuggestion: {
        primary: "Starter Pakket (€750-1500)",
        alternative: "Maandelijks Pakket (€1500-2500/maand)",
        reasoning: "Perfect voor een sterke start - professionele productie met persoonlijke begeleiding."
      },
      urgency: "Start met begeleiding - starter pakket",
      talkingPoints: [
        "Nog geen video content - help met eerste stappen",
        `Doel: ${decoded.primaryGoal} - toon succesverhalen van starters`,
        "Persoonlijke begeleiding inbegrepen voor goede basis"
      ]
    },
    "Algemene Prospect": {
      persona: "Jouw Video Journey Begint Hier",
      description: "Je hebt interesse in professionele video content en wilt graag de mogelijkheden verkennen",
      recommendations: [
        "Persoonlijk kennismakingsgesprek om je visie te begrijpen",
        "Samen ontdekken welke video aanpak het beste bij jou past",
        "Op maat gemaakt plan speciaal voor jouw situatie",
        "Flexibele opties bespreken"
      ],
      packageSuggestion: {
        primary: "Op Maat Gemaakt Pakket (Prijs op aanvraag)",
        alternative: "Flexibel Per Project (€500-2000 per project)",
        reasoning: "Laten we in gesprek gaan om de perfecte oplossing voor jouw situatie te vinden."
      },
      urgency: "Plan kennismakingsgesprek om behoeften te bespreken",
      talkingPoints: [
        `Doel: ${decoded.primaryGoal}`,
        `Uitdaging: ${decoded.primaryChallenge}`,
        "Persoonlijk gesprek voor op maat gemaakt advies"
      ]
    }
  };
  
  return recommendationsMap[persona] || recommendationsMap["Algemene Prospect"];
}

// Calculate full lead qualification
export function qualifyLead(decoded: DecodedAssessment): LeadQualification {
  const personaType = determinePersona(decoded);
  const readinessScore = calculateReadinessScore(decoded);
  const budgetIndicator = determineBudgetIndicator(decoded);
  const urgency = assessUrgency(decoded);
  const serviceMatches = matchServices(decoded);
  const recommendations = getPersonaRecommendations(personaType, decoded);
  
  // Calculate conversion probability
  let conversionProbability: "high" | "medium" | "low" = "medium";
  if (readinessScore >= 70 && budgetIndicator !== "low") {
    conversionProbability = "high";
  } else if (readinessScore < 40 || budgetIndicator === "low") {
    conversionProbability = "low";
  }
  
  return {
    personaType,
    readinessScore,
    budgetIndicator,
    urgency,
    serviceMatches,
    conversionProbability,
    recommendedPackage: recommendations.packageSuggestion.primary,
    recommendedApproach: recommendations.urgency
  };
}
