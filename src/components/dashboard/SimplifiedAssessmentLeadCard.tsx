import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  Trash2,
  Save,
  Target,
  AlertCircle,
  Package,
  Users,
  Plane,
  Globe,
} from "lucide-react";
import { decodeAssessmentAnswers } from "@/lib/leadUtils";

interface AssessmentLead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  status: string;
  created_at: string;
  notes: string | null;
  answers: any;
}

interface SimplifiedAssessmentLeadCardProps {
  lead: AssessmentLead;
  onStatusUpdate: (id: string, status: string) => void;
  onNotesUpdate: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export default function SimplifiedAssessmentLeadCard({
  lead,
  onStatusUpdate,
  onNotesUpdate,
  onDelete,
}: SimplifiedAssessmentLeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(lead.notes || "");
  const decoded = decodeAssessmentAnswers(lead.answers);

  const handleSaveNotes = () => {
    onNotesUpdate(lead.id, localNotes);
  };

  const getCompanySizeIcon = (size: string) => {
    if (size === "solo" || size === "2-5") return <Users className="h-3.5 w-3.5" />;
    if (size === "6-20") return <Building className="h-3.5 w-3.5" />;
    return <Building className="h-4 w-4" />;
  };

  // Map questions to readable text
  const questions = {
    q1: "Post je nu regelmatig video's?",
    q2: "Heb je een plan voor content?",
    q3: "Weet je of je video's werken?",
    q4: "Ken je je doelgroep goed?",
    q5: "Hoeveel tijd heb je voor video's?",
    q6: "Heb je professionele apparatuur?",
    q7: "Heb je een team voor content?",
    q8: "Hoe groot is je bedrijf?",
    q9: "Wat is je primaire doel?",
    q10: "Wat is je grootste uitdaging?",
    q11: "Welke oplossing zoek je?",
    q12: "Interesse in drone content?",
    q13: "Hoe ziet je website eruit?",
    q14: "Extra opmerkingen",
  };

  const formatAnswer = (key: string, value: any): string => {
    if (!value) return "Niet ingevuld";
    
    // Specific formatting per question
    const answerMap: Record<string, Record<string, string>> = {
      q1: {
        "regularly": "Ja, regelmatig (3+ per week)",
        "sometimes": "Ja, maar niet vaak (1-2x per maand)",
        "rarely": "Bijna nooit",
        "never": "Nee, nog niet begonnen",
      },
      q2: {
        "yes": "Ja, ik heb een strategie",
        "sometimes": "Soms, als ik tijd heb",
        "no": "Nee, ik post impulsief",
      },
      q3: {
        "yes": "Ja, ik track mijn resultaten",
        "sometimes": "Soms kijk ik ernaar",
        "no": "Nee, geen idee eigenlijk",
      },
      q4: {
        "yes": "Ja, heel goed",
        "somewhat": "Een beetje",
        "no": "Nee, niet echt",
      },
      q5: {
        "lots": "Veel, ik focus erop",
        "some": "Een paar uur per week",
        "little": "Weinig, druk met andere dingen",
        "none": "Geen tijd eigenlijk",
      },
      q6: {
        "yes": "Ja, professionele gear",
        "smartphone": "Alleen m'n smartphone",
        "basic": "Basis apparatuur",
        "none": "Nee, niks",
      },
      q7: {
        "yes": "Ja, we doen het samen",
        "outsource": "Nee, maar we outsourcen soms",
        "solo": "Nee, ik doe alles zelf",
      },
      q8: {
        "solo": "Solo entrepreneur",
        "2-5": "2-5 medewerkers",
        "6-20": "6-20 medewerkers",
        "20+": "20+ medewerkers",
      },
      q9: {
        "awareness": "Meer naamsbekendheid",
        "leads": "Leads & nieuwe klanten",
        "retention": "Klantenbinding versterken",
        "recruitment": "Talent aantrekken",
      },
      q10: {
        "time": "Geen tijd om het zelf te doen",
        "ideas": "Geen ideeën voor content",
        "budget": "Budget voor professionals",
        "quality": "Kwaliteit is niet goed genoeg",
        "results": "Het levert niet genoeg op",
      },
      q11: {
        "monthly": "Maandelijks content pakket",
        "project": "Per project werken",
        "once": "Eenmalige productie",
        "managed": "Volledig beheerd abonnement",
      },
      q12: {
        "very": "Ja, zeer geïnteresseerd!",
        "maybe": "Misschien, vertel meer",
        "unknown": "Weet niet wat dat is",
        "no": "Nee, niet relevant",
      },
      q13: {
        "none": "Nog geen website",
        "outdated": "Ja, maar verouderd",
        "integrate": "Ja, maar wil video integreren",
        "modern": "Ja, moderne website",
      },
    };

    return answerMap[key]?.[value] || value;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in">
      <CardContent className="p-4 sm:p-6">
        {/* Collapsed State - Quick Overview */}
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{lead.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Building className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{lead.company}</span>
              </p>
            </div>
            <Select value={lead.status} onValueChange={(value) => onStatusUpdate(lead.id, value)}>
              <SelectTrigger className="w-32 h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-primary hover:underline">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate max-w-[200px]">{lead.email}</span>
            </a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-primary hover:underline">
                <Phone className="h-3.5 w-3.5" />
                {lead.phone}
              </a>
            )}
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(lead.created_at).toLocaleDateString("nl-NL")}
            </span>
          </div>

          {/* Key Insights Badges */}
          <div className="flex flex-wrap gap-2">
            {/* Primary Goal */}
            {decoded.primaryGoal && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Target className="h-3 w-3 mr-1" />
                {formatAnswer("q9", decoded.primaryGoal)}
              </Badge>
            )}

            {/* Biggest Challenge */}
            {decoded.primaryChallenge && (
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                {formatAnswer("q10", decoded.primaryChallenge)}
              </Badge>
            )}

            {/* Preferred Solution */}
            {decoded.preferredSolution && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <Package className="h-3 w-3 mr-1" />
                {formatAnswer("q11", decoded.preferredSolution)}
              </Badge>
            )}

            {/* Company Size */}
            {decoded.companySize && (
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {getCompanySizeIcon(decoded.companySize)}
                <span className="ml-1">{formatAnswer("q8", decoded.companySize)}</span>
              </Badge>
            )}

            {/* Drone Interest - if very interested */}
            {decoded.droneInterest === "very" && (
              <Badge variant="outline" className="bg-sky-50 text-sky-700 border-sky-200">
                <Plane className="h-3 w-3 mr-1" />
                🚁 Drone interesse
              </Badge>
            )}

            {/* Website Need - if none or outdated */}
            {(decoded.websiteStatus === "none" || decoded.websiteStatus === "outdated") && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <Globe className="h-3 w-3 mr-1" />
                💻 Website nodig
              </Badge>
            )}
          </div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full justify-between hover:bg-muted"
          >
            <span className="text-sm font-medium">
              {expanded ? "Verberg details" : "Bekijk alle antwoorden"}
            </span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {/* Expanded State - All Q&A */}
          {expanded && (
            <div className="pt-4 border-t space-y-4 animate-fade-in">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Assessment Antwoorden
                </h4>
                <div className="space-y-2.5">
                  {/* Map decoded answers back to questions */}
                  {[
                    { q: "q1", label: questions.q1, value: decoded.contentMaturity },
                    { q: "q2", label: questions.q2, value: decoded.hasStrategy },
                    { q: "q3", label: questions.q3, value: decoded.measuresPerformance },
                    { q: "q4", label: questions.q4, value: decoded.targetAudience },
                    { q: "q5", label: questions.q5, value: decoded.timeInvestment },
                    { q: "q6", label: questions.q6, value: decoded.equipment },
                    { q: "q7", label: questions.q7, value: decoded.teamStructure },
                    { q: "q8", label: questions.q8, value: decoded.companySize },
                    { q: "q9", label: questions.q9, value: decoded.primaryGoal },
                    { q: "q10", label: questions.q10, value: decoded.primaryChallenge },
                    { q: "q11", label: questions.q11, value: decoded.preferredSolution },
                    { q: "q12", label: questions.q12, value: decoded.droneInterest },
                    { q: "q13", label: questions.q13, value: decoded.websiteStatus },
                    { q: "q14", label: questions.q14, value: decoded.specialRequest },
                  ].map(({ q, label, value }) => {
                    if (!value && q !== "q14") return null;

                    return (
                      <div key={q} className="text-sm">
                        <p className="font-medium text-foreground mb-1">{label}</p>
                        <p className="text-muted-foreground pl-3 border-l-2 border-primary/20">
                          → {formatAnswer(q, value)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Admin Notities
                </label>
                <Textarea
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="Voeg interne notities toe..."
                  className="min-h-[80px] text-sm"
                />
                {localNotes !== (lead.notes || "") && (
                  <Button onClick={handleSaveNotes} size="sm" className="w-full">
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Notities opslaan
                  </Button>
                )}
              </div>

              {/* Delete Button */}
              <Button
                onClick={() => {
                  if (confirm(`Weet je zeker dat je ${lead.name} wilt verwijderen?`)) {
                    onDelete(lead.id);
                  }
                }}
                variant="destructive"
                size="sm"
                className="w-full"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Lead verwijderen
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
