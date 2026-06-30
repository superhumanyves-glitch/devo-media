import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalePath } from "@/hooks/useLocalePath";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import QuizProgress from "@/components/QuizProgress";
import { useAssessment } from "@/contexts/AssessmentContext";
import { useToast } from "@/hooks/use-toast";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ScrollProgress } from "@/components/ScrollProgress";

const AssessmentQuiz = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { toast } = useToast();
  const { state, setContactInfo, setAnswer, calculateScore, getSegment, submitToDatabase } = useAssessment();
  const [currentStep, setCurrentStep] = useState(0);
  const [tempContactInfo, setTempContactInfo] = useState({
    name: state.contactInfo?.name || "",
    email: state.contactInfo?.email || "",
    company: state.contactInfo?.company || "",
    phone: state.contactInfo?.phone || "",
  });
  const [currentAnswer, setCurrentAnswer] = useState("");

  const questions = [
    {
      id: "q1",
      question: "Post je nu regelmatig video's op social media?",
      options: [
        { value: "option1", label: "Ja, minstens 3x per week" },
        { value: "option2", label: "Ja, maar niet vaak (1-2x per maand)" },
        { value: "option3", label: "Nee, nog nooit gedaan" }
      ]
    },
    {
      id: "q2",
      question: "Heb je een plan voor je video content?",
      options: [
        { value: "option1", label: "Ja, alles staat gepland" },
        { value: "option2", label: "Soms, als ik tijd heb" },
        { value: "option3", label: "Nee, ik wil hulp met een plan" }
      ]
    },
    {
      id: "q3",
      question: "Meet je hoe goed je video's presteren?",
      options: [
        { value: "option1", label: "Ja, ik bekijk alle cijfers" },
        { value: "option2", label: "Soms kijk ik naar views en likes" },
        { value: "option3", label: "Nee, weet niet hoe" }
      ]
    },
    {
      id: "q4",
      question: "Weet je precies wie je wilt bereiken met je video's?",
      options: [
        { value: "option1", label: "Ja, heel specifiek" },
        { value: "option2", label: "Een beetje, niet heel gedetailleerd" },
        { value: "option3", label: "Nee, wil een brede groep bereiken" }
      ]
    },
    {
      id: "q5",
      question: "Hoeveel tijd besteed je per maand aan video's maken?",
      options: [
        { value: "option1", label: "Meer dan 10 uur" },
        { value: "option2", label: "5-10 uur" },
        { value: "option3", label: "Minder dan 5 uur" },
        { value: "option4", label: "0 uur - geen tijd" }
      ]
    },
    {
      id: "q6",
      question: "Wat gebruik je om video's op te nemen?",
      options: [
        { value: "option1", label: "Professionele camera en apparatuur" },
        { value: "option2", label: "Smartphone" },
        { value: "option3", label: "Ik heb niks" }
      ]
    },
    {
      id: "q7",
      question: "Wie maakt je video content?",
      options: [
        { value: "option1", label: "Iemand die zich hier fulltime mee bezig houdt" },
        { value: "option2", label: "Meerdere mensen af en toe" },
        { value: "option3", label: "Ik doe het zelf erbij" }
      ]
    },
    {
      id: "q8",
      question: "Hoe groot is je bedrijf?",
      options: [
        { value: "solo", label: "Alleen ikzelf (ZZP'er)" },
        { value: "small", label: "Klein team (2-10 mensen)" },
        { value: "growing", label: "Groeiend (10-50 mensen)" },
        { value: "established", label: "Groot bedrijf (50+ mensen)" }
      ]
    },
    {
      id: "q9",
      question: "Wat wil je bereiken met video's de komende 3 maanden?",
      options: [
        { value: "awareness", label: "Bekendheid - meer mensen moeten ons kennen" },
        { value: "leads", label: "Leads - meer potentiële klanten" },
        { value: "retention", label: "Klantbinding - betere relatie met klanten" },
        { value: "explanation", label: "Uitleg - duidelijk maken wat we doen" },
        { value: "recruitment", label: "Personeel - goede mensen aantrekken" }
      ]
    },
    {
      id: "q10",
      question: "Wat is je grootste probleem met video content?",
      options: [
        { value: "time", label: "Geen tijd" },
        { value: "ideas", label: "Geen ideeën" },
        { value: "budget", label: "Te duur" },
        { value: "quality", label: "Ziet er niet goed uit" },
        { value: "results", label: "Zie geen resultaten" }
      ]
    },
    {
      id: "q11",
      question: "Welke oplossing past bij jou?",
      options: [
        { value: "monthly", label: "Maandelijks - vaste content" },
        { value: "project", label: "Per project - flexibel" },
        { value: "onetime", label: "Eenmalig - voor een event" },
        { value: "managed", label: "Alles uitbesteden" }
      ]
    },
    {
      id: "q12",
      question: "Wil je drone video's voor je bedrijf?",
      options: [
        { value: "very", label: "Ja, zeker" },
        { value: "maybe", label: "Misschien, wil eerst voorbeelden zien" },
        { value: "no", label: "Nee, niet relevant" },
        { value: "unknown", label: "Weet niet wat dat kan betekenen" }
      ]
    },
    {
      id: "q13",
      question: "Heb je een website?",
      options: [
        { value: "modern", label: "Ja, een moderne website" },
        { value: "outdated", label: "Ja, maar moet vernieuwd worden" },
        { value: "none", label: "Nee, heb er nog geen" },
        { value: "integrate", label: "Ja, maar wil video's toevoegen" }
      ]
    },
    {
      id: "q14",
      type: "text",
      question: "Nog iets wat we moeten weten? (Optioneel)",
      placeholder: "Bijvoorbeeld: 'We starten binnenkort met een nieuw product'..."
    }
  ];

  const totalSteps = questions.length + 1; // +1 for contact form

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempContactInfo.name || !tempContactInfo.email || !tempContactInfo.company) {
      toast({
        title: "Vul alle verplichte velden in",
        description: "Naam, email en bedrijfsnaam zijn verplicht",
        variant: "destructive",
      });
      return;
    }
    setContactInfo(tempContactInfo);
    setCurrentStep(1);
  };

  const handleNext = () => {
    const question = questions[currentStep - 1];
    
    if (question.type === "text") {
      setAnswer(question.id, currentAnswer);
      setCurrentStep(currentStep + 1);
      setCurrentAnswer("");
    } else {
      if (!currentAnswer) {
        toast({
          title: "Selecteer een optie",
          description: "Kies een antwoord voordat je verder gaat",
          variant: "destructive",
        });
        return;
      }
      setAnswer(question.id, currentAnswer);
      setCurrentStep(currentStep + 1);
      setCurrentAnswer("");
    }
  };

  const handleFinish = async () => {
    const score = calculateScore();
    const segment = getSegment(score);
    
    // Send the assessment results by email
    const result = await submitToDatabase();

    if (!result.success) {
      toast({
        title: "Waarschuwing",
        description: "Je resultaten worden getoond, maar we konden ze niet naar ons versturen. Geen zorgen, je kunt ze nog steeds bekijken!",
        variant: "default",
      });
    }

    navigate(localePath('/assessment/results'));
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(localePath('/video-readiness-assessment'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScrollProgress />
      <StickyCtaBar />
      <Header />
      
      <main className="flex-1 pt-32 sm:pt-36 py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <QuizProgress current={currentStep + 1} total={totalSteps} />

          {currentStep === 0 ? (
            // Contact Form
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
                Laten we beginnen
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                Vul je gegevens in om je gepersonaliseerde resultaten te ontvangen
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto">
                <div>
                  <Label htmlFor="name">Naam *</Label>
                  <Input
                    id="name"
                    value={tempContactInfo.name}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, name: e.target.value })}
                    placeholder="Je volledige naam"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={tempContactInfo.email}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, email: e.target.value })}
                    placeholder="je@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Bedrijfsnaam *</Label>
                  <Input
                    id="company"
                    value={tempContactInfo.company}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, company: e.target.value })}
                    placeholder="Je bedrijfsnaam"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefoonnummer (optioneel)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={tempContactInfo.phone}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, phone: e.target.value })}
                    placeholder="+31 6 12345678"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Terug
                  </Button>
                  <Button type="submit" className="flex-1 gap-2">
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          ) : currentStep <= questions.length ? (
            // Question
            <div className="animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">
                {questions[currentStep - 1].question}
              </h2>

              {questions[currentStep - 1].type === "text" ? (
                <div className="max-w-md mx-auto">
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder={questions[currentStep - 1].placeholder}
                    className="min-h-[120px]"
                  />
                </div>
              ) : (
                <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
                  <div className="space-y-3 w-full max-w-md mx-auto">
                    {questions[currentStep - 1].options?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer w-full"
                        onClick={() => setCurrentAnswer(option.value)}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              )}

              <div className="flex gap-4 mt-8 max-w-md mx-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Terug
                </Button>
                
                {currentStep === questions.length ? (
                  <Button onClick={handleFinish} className="flex-1 gap-2">
                    Bekijk Resultaten <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex-1 gap-2">
                    Volgende <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default AssessmentQuiz;
