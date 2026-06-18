import { useState } from "react";
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
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Building2,
  Calendar,
  Sparkles,
  Trash2
} from "lucide-react";
import AssessmentInsights from "./AssessmentInsights";
import { 
  decodeAssessmentAnswers, 
  recommendNextAction,
  getPersonaRecommendations
} from "@/lib/leadUtils";

interface AssessmentLeadCardProps {
  lead: any;
  onStatusUpdate: (id: string, status: string) => void;
  onNotesUpdate: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export default function AssessmentLeadCard({
  lead,
  onStatusUpdate,
  onNotesUpdate,
  onDelete,
}: AssessmentLeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editingNotes, setEditingNotes] = useState(lead.notes || "");

  const decoded = decodeAssessmentAnswers(lead.answers);
  const nextAction = recommendNextAction(lead, "assessment");
  
  // Get persona recommendations if persona_type exists
  const personaRecommendations = lead.persona_type 
    ? getPersonaRecommendations(lead.persona_type, decoded)
    : null;
  
  // Helper functie voor persona badge kleuren
  const getPersonaBadgeColor = (persona: string) => {
    const colorMap: Record<string, string> = {
      "Klaar om te Schalen": "bg-green-500/10 text-green-700 border-green-500/20",
      "Volledig Uitbesteden": "bg-purple-500/10 text-purple-700 border-purple-500/20",
      "Inconsistente Creator": "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
      "Flexibel Per Project": "bg-blue-500/10 text-blue-700 border-blue-500/20",
      "Budget Bewust": "bg-orange-500/10 text-orange-700 border-orange-500/20",
      "Ambitieuze Starter": "bg-cyan-500/10 text-cyan-700 border-cyan-500/20",
    };
    return colorMap[persona] || "bg-slate-500/10 text-slate-700 border-slate-500/20";
  };
  
  // Helper function for urgency icons
  const getUrgencyIcon = (urgency: string) => {
    if (urgency === "immediate") return "🔥";
    if (urgency === "short-term") return "⚡";
    return "📅";
  };
  
  // Helper function for budget icons
  const getBudgetIcon = (budget: string) => {
    if (budget === "high") return "€€€";
    if (budget === "medium") return "€€";
    return "€";
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      {/* Main Card Content */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {lead.persona_type && (
                <Badge className={getPersonaBadgeColor(lead.persona_type)}>
                  {lead.persona_type}
                </Badge>
              )}
              {lead.conversion_probability && (
                <Badge variant={lead.conversion_probability === "high" ? "default" : "secondary"}>
                  {lead.conversion_probability === "high" ? "🎯" : lead.conversion_probability === "medium" ? "📊" : "📉"} {lead.conversion_probability} conversie
                </Badge>
              )}
              {/* Drone Interest Badge */}
              {lead.answers && typeof lead.answers === 'object' && !Array.isArray(lead.answers) && 
               (lead.answers as Record<string, any>).q12 === "very" && (
                <Badge className="bg-sky-500/10 text-sky-700 border-sky-500/20">
                  🚁 Drone Interest
                </Badge>
              )}
              {/* Website Opportunity Badge */}
              {lead.answers && typeof lead.answers === 'object' && !Array.isArray(lead.answers) && 
               ((lead.answers as Record<string, any>).q13 === "none" || 
                (lead.answers as Record<string, any>).q13 === "outdated") && (
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                  💻 Website Opportunity
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold truncate">{lead.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span className="truncate">{lead.company}</span>
            </div>
            {/* Additional indicators */}
            {(lead.urgency_level || lead.budget_indicator) && (
              <div className="flex items-center gap-2 mt-1">
                {lead.urgency_level && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                    {getUrgencyIcon(lead.urgency_level)} {lead.urgency_level}
                  </span>
                )}
                {lead.budget_indicator && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                    {getBudgetIcon(lead.budget_indicator)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Select
              value={lead.status}
              onValueChange={(value) => onStatusUpdate(lead.id, value)}
            >
              <SelectTrigger className="w-32 transition-all hover:border-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="animate-scale-in">
                <SelectItem value="new" className="cursor-pointer">New</SelectItem>
                <SelectItem value="contacted" className="cursor-pointer">Contacted</SelectItem>
                <SelectItem value="converted" className="cursor-pointer">Converted</SelectItem>
                <SelectItem value="closed" className="cursor-pointer">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(lead.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b">
          <a 
            href={`mailto:${lead.email}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{lead.email}</span>
          </a>
          {lead.phone && (
            <a 
              href={`tel:${lead.phone}`}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </a>
          )}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(lead.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Quick Insights (Collapsed View) */}
        {!expanded && (
          <div className="space-y-3">
            {/* Service Matches */}
            {lead.service_matches && lead.service_matches.length > 0 && (
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Matching Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.service_matches.slice(0, 3).map((service: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {lead.service_matches.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{lead.service_matches.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recommended Package */}
            {lead.recommended_package && (
              <div className="flex items-start gap-2 p-2 rounded-md bg-primary/5 border border-primary/20">
                <span className="text-sm">✨</span>
                <p className="text-xs flex-1">
                  <span className="font-medium text-primary">Best Match:</span> {lead.recommended_package}
                </p>
              </div>
            )}

            {/* Suggested Action */}
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <span className="text-sm">💡</span>
              <p className="text-xs text-muted-foreground flex-1">
                <span className="font-medium">Aanpak:</span> {lead.recommended_approach || nextAction}
              </p>
            </div>
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 gap-2 hover-scale"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 transition-transform" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 transition-transform" />
              View Full Details
            </>
          )}
        </Button>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t bg-muted/30 p-4 space-y-4 animate-accordion-down">
          {/* Lead Intelligence Panel */}
          {personaRecommendations && lead.readiness_score && (
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                💡 Lead Intelligence
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Readiness Score</p>
                  <p className="text-lg font-bold text-primary">{lead.readiness_score}/100</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Conversie Kans</p>
                  <p className="text-lg font-bold capitalize">{lead.conversion_probability}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Persona Beschrijving</p>
                  <p className="text-sm">{personaRecommendations.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Recommended Approach */}
          {personaRecommendations && (
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h4 className="font-semibold mb-3">🎯 Aanbevolen Aanpak</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Package Suggestie</p>
                  <p className="text-sm font-medium text-blue-700">{personaRecommendations.packageSuggestion.primary}</p>
                  <p className="text-xs text-muted-foreground mt-1">{personaRecommendations.packageSuggestion.reasoning}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Urgentie</p>
                  <p className="text-sm">{personaRecommendations.urgency}</p>
                </div>
              </div>
            </div>
          )}

          {/* Key Talking Points */}
          {personaRecommendations && personaRecommendations.talkingPoints.length > 0 && (
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <h4 className="font-semibold mb-3">📊 Key Talking Points</h4>
              <ul className="space-y-2">
                {personaRecommendations.talkingPoints.map((point, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Recommendations */}
          {personaRecommendations && personaRecommendations.recommendations.length > 0 && (
            <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <h4 className="font-semibold mb-3">✅ Aanbevelingen</h4>
              <ul className="space-y-2">
                {personaRecommendations.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span className="flex-1">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Assessment Insights */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Complete Assessment Breakdown
            </h4>
            <AssessmentInsights 
              decoded={decoded} 
              score={lead.score}
              readinessScore={lead.readiness_score}
              serviceMatches={lead.service_matches}
            />
          </div>

          {/* Admin Notes */}
          <div>
            <h4 className="font-semibold mb-2">Admin Notes</h4>
            <Textarea
              placeholder="Add notes about this lead..."
              value={editingNotes}
              onChange={(e) => setEditingNotes(e.target.value)}
              className="mb-2"
              maxLength={5000}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {editingNotes.length} / 5000 characters
              </span>
              <Button
                size="sm"
                onClick={() => onNotesUpdate(lead.id, editingNotes)}
                disabled={editingNotes === (lead.notes || "")}
                className="hover-scale"
              >
                Save Notes
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
