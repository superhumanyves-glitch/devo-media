import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { DecodedAssessment, getRecommendedPackage } from "@/lib/leadUtils";

interface AssessmentInsightsProps {
  decoded: DecodedAssessment;
  score: number;
  readinessScore?: number;
  serviceMatches?: string[];
}

export default function AssessmentInsights({ 
  decoded, 
  score, 
  readinessScore,
  serviceMatches 
}: AssessmentInsightsProps) {
  const recommended = getRecommendedPackage(decoded);

  return (
    <div className="space-y-4">
      {/* Quick Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Content Volwassenheid */}
        <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
          {decoded.contentMaturityLevel === "high" ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : decoded.contentMaturityLevel === "medium" ? (
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">Content Volwassenheid</p>
            <p className="text-sm font-medium truncate">{decoded.contentMaturity}</p>
          </div>
        </div>

        {/* Doelgroep */}
        <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
          <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">Doelgroep</p>
            <p className="text-sm font-medium truncate">{decoded.targetAudience}</p>
          </div>
        </div>

        {/* Bedrijfsgrootte */}
        <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
          <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">Bedrijfsgrootte</p>
            <p className="text-sm font-medium truncate">{decoded.companySize}</p>
          </div>
        </div>

        {/* Tijd Investering */}
        <div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground font-medium">Huidige Tijd Investering</p>
            <p className="text-sm font-medium truncate">{decoded.timeInvestment}</p>
          </div>
        </div>
      </div>

      {/* Primair Doel & Uitdaging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <p className="text-xs text-muted-foreground font-medium">Primair Doel</p>
          </div>
          <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">
            {decoded.primaryGoal}
          </Badge>
        </div>

        <div className="p-3 rounded-lg border bg-card">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <p className="text-xs text-muted-foreground font-medium">Grootste Uitdaging</p>
          </div>
          <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/20">
            {decoded.primaryChallenge}
          </Badge>
        </div>
      </div>

      {/* Aanbevolen Pakket */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            ✨
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-primary mb-1">
              Aanbevolen: {recommended.package}
            </p>
            <p className="text-xs text-muted-foreground">
              {recommended.reason}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Voorkeur: {decoded.preferredSolution}
            </p>
          </div>
        </div>
      </div>

      {/* Readiness Score if available */}
      {readinessScore !== undefined && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">
                Video Readiness Score
              </p>
              <p className="text-xs text-muted-foreground">
                Hoe ready is deze lead voor professionele video content
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{readinessScore}</p>
              <p className="text-xs text-muted-foreground">/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Service Matches if available */}
      {serviceMatches && serviceMatches.length > 0 && (
        <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <p className="text-sm font-semibold text-blue-700 mb-2">
            Perfect Voor Deze Services:
          </p>
          <div className="flex flex-wrap gap-2">
            {serviceMatches.map((service, idx) => (
              <Badge key={idx} className="bg-blue-500/10 text-blue-700 border-blue-500/20">
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Special Request if provided */}
      {decoded.specialRequest && (
        <div className="p-3 rounded-lg bg-muted/50 border">
          <p className="text-xs text-muted-foreground font-medium mb-1">Speciale Wens:</p>
          <p className="text-sm italic">&ldquo;{decoded.specialRequest}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
