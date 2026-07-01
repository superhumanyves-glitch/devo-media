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
import { useTranslation } from "react-i18next";

// Canonical question/answer metadata. The `value`s are language-independent
// and feed the scoring (calculateScore) and lead decoding (leadUtils).
const questionMeta: { id: string; type?: "text"; values?: string[] }[] = [
  { id: "q1", values: ["option1", "option2", "option3"] },
  { id: "q2", values: ["option1", "option2", "option3"] },
  { id: "q3", values: ["option1", "option2", "option3"] },
  { id: "q4", values: ["option1", "option2", "option3"] },
  { id: "q5", values: ["option1", "option2", "option3", "option4"] },
  { id: "q6", values: ["option1", "option2", "option3"] },
  { id: "q7", values: ["option1", "option2", "option3"] },
  { id: "q8", values: ["solo", "small", "growing", "established"] },
  { id: "q9", values: ["awareness", "leads", "retention", "explanation", "recruitment"] },
  { id: "q10", values: ["time", "ideas", "budget", "quality", "results"] },
  { id: "q11", values: ["monthly", "project", "onetime", "managed"] },
  { id: "q12", values: ["very", "maybe", "no", "unknown"] },
  { id: "q13", values: ["modern", "outdated", "none", "integrate"] },
  { id: "budget", values: ["upto500", "500to1500", "1500plus", "unsure"] },
  { id: "timeline", values: ["asap", "1to3", "3plus", "exploring"] },
  { id: "q14", type: "text" },
];

const AssessmentQuiz = () => {
  const navigate = useNavigate();
  const localePath = useLocalePath();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { state, setContactInfo, setAnswer, calculateScore, getSegment, submitToDatabase } = useAssessment();
  const [currentStep, setCurrentStep] = useState(0);
  const [tempContactInfo, setTempContactInfo] = useState({
    name: state.contactInfo?.name || "",
    email: state.contactInfo?.email || "",
    company: state.contactInfo?.company || "",
    phone: state.contactInfo?.phone || "",
  });
  const [currentAnswer, setCurrentAnswer] = useState("");

  const questionContent = t("assessmentQuiz.questions", { returnObjects: true }) as { question: string; options?: string[]; placeholder?: string }[];
  const questions = questionMeta.map((meta, i) => ({
    id: meta.id,
    type: meta.type,
    question: questionContent[i].question,
    placeholder: questionContent[i].placeholder,
    options: meta.values?.map((value, j) => ({ value, label: questionContent[i].options?.[j] ?? value })),
  }));

  const totalSteps = questions.length + 1; // +1 for contact form

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempContactInfo.name || !tempContactInfo.email || !tempContactInfo.company || !tempContactInfo.phone) {
      toast({
        title: t("assessmentQuiz.toastRequiredTitle"),
        description: t("assessmentQuiz.toastRequiredDesc"),
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
          title: t("assessmentQuiz.toastSelectTitle"),
          description: t("assessmentQuiz.toastSelectDesc"),
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

    // Build accurate question/answer pairs straight from what was shown, so the
    // email always matches the actual questions (incl. the free-text question).
    const responses = questions
      .map((q) => {
        if (q.type === "text") {
          const txt = currentAnswer.trim();
          return txt ? { question: q.question, answer: txt } : null;
        }
        const value = state.answers[q.id];
        const label = q.options?.find((o) => o.value === value)?.label;
        return label ? { question: q.question, answer: label } : null;
      })
      .filter((r): r is { question: string; answer: string } => r !== null);

    // Send the assessment results by email (pass freshly computed values —
    // the equivalent state may not be updated yet because setState is async)
    const result = await submitToDatabase(score, segment, responses);

    if (!result.success) {
      toast({
        title: t("assessmentQuiz.toastWarnTitle"),
        description: t("assessmentQuiz.toastWarnDesc"),
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
                {t("assessmentQuiz.contactTitle")}
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                {t("assessmentQuiz.contactSubtitle")}
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto">
                <div>
                  <Label htmlFor="name">{t("assessmentQuiz.nameLabel")}</Label>
                  <Input
                    id="name"
                    value={tempContactInfo.name}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, name: e.target.value })}
                    placeholder={t("assessmentQuiz.namePlaceholder")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t("assessmentQuiz.emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={tempContactInfo.email}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, email: e.target.value })}
                    placeholder={t("assessmentQuiz.emailPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">{t("assessmentQuiz.companyLabel")}</Label>
                  <Input
                    id="company"
                    value={tempContactInfo.company}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, company: e.target.value })}
                    placeholder={t("assessmentQuiz.companyPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{t("assessmentQuiz.phoneLabel")}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={tempContactInfo.phone}
                    onChange={(e) => setTempContactInfo({ ...tempContactInfo, phone: e.target.value })}
                    placeholder={t("assessmentQuiz.phonePlaceholder")}
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t("assessmentQuiz.back")}
                  </Button>
                  <Button type="submit" className="flex-1 gap-2">
                    {t("assessmentQuiz.startButton")} <ArrowRight className="w-4 h-4" />
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
                  <ArrowLeft className="w-4 h-4" /> {t("assessmentQuiz.back")}
                </Button>

                {currentStep === questions.length ? (
                  <Button onClick={handleFinish} className="flex-1 gap-2">
                    {t("assessmentQuiz.viewResults")} <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="flex-1 gap-2">
                    {t("assessmentQuiz.next")} <ArrowRight className="w-4 h-4" />
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
