import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Plane,
  Globe
} from "lucide-react";

interface InsightsData {
  personaDistribution: Record<string, number>;
  conversionProbability: Record<string, number>;
  topServices: Array<{ service: string; count: number }>;
  urgencyLevels: Record<string, number>;
  budgetIndicators: Record<string, number>;
  droneInterest: { high: number; medium: number; low: number; none: number };
  websiteNeeds: { high: number; medium: number; low: number; none: number };
}

export default function LeadInsights() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<InsightsData>({
    personaDistribution: {},
    conversionProbability: {},
    topServices: [],
    urgencyLevels: {},
    budgetIndicators: {},
    droneInterest: { high: 0, medium: 0, low: 0, none: 0 },
    websiteNeeds: { high: 0, medium: 0, low: 0, none: 0 }
  });

  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();
    let retryCount = 0;
    const maxRetries = 2;

    const fetchWithRetry = async () => {
      try {
        const { data, error } = await Promise.race([
          supabase
            .from('assessment_submissions')
            .select('*')
            .order('created_at', { ascending: false })
            .abortSignal(abortController.signal),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 10000)
          ),
        ]) as any;

        if (!isMounted) return;

        if (error) throw error;

        if (data) {
          const personaDist: Record<string, number> = {};
          const conversionProb: Record<string, number> = {};
          const urgency: Record<string, number> = {};
          const budget: Record<string, number> = {};
          const servicesMap: Record<string, number> = {};
          const droneStats = { high: 0, medium: 0, low: 0, none: 0 };
          const websiteStats = { high: 0, medium: 0, low: 0, none: 0 };

          data.forEach((lead) => {
            if (lead.persona_type) {
              personaDist[lead.persona_type] = (personaDist[lead.persona_type] || 0) + 1;
            }

            if (lead.conversion_probability) {
              conversionProb[lead.conversion_probability] = 
                (conversionProb[lead.conversion_probability] || 0) + 1;
            }

            if (lead.urgency_level) {
              urgency[lead.urgency_level] = (urgency[lead.urgency_level] || 0) + 1;
            }

            if (lead.budget_indicator) {
              budget[lead.budget_indicator] = (budget[lead.budget_indicator] || 0) + 1;
            }

            if (lead.service_matches && Array.isArray(lead.service_matches)) {
              lead.service_matches.forEach((service: string) => {
                servicesMap[service] = (servicesMap[service] || 0) + 1;
              });
            }

            if (lead.answers && typeof lead.answers === 'object' && !Array.isArray(lead.answers)) {
              const answers = lead.answers as Record<string, any>;
              const q12 = answers.q12;
              if (q12 === "very") droneStats.high++;
              else if (q12 === "maybe") droneStats.medium++;
              else if (q12 === "unknown") droneStats.low++;
              else if (q12 === "no") droneStats.none++;

              const q13 = answers.q13;
              if (q13 === "none" || q13 === "outdated") websiteStats.high++;
              else if (q13 === "integrate") websiteStats.medium++;
              else if (q13 === "modern") websiteStats.none++;
            }
          });

          const topServices = Object.entries(servicesMap)
            .map(([service, count]) => ({ service, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

          if (isMounted) {
            setInsights({
              personaDistribution: personaDist,
              conversionProbability: conversionProb,
              topServices,
              urgencyLevels: urgency,
              budgetIndicators: budget,
              droneInterest: droneStats,
              websiteNeeds: websiteStats
            });
            setLoading(false);
          }
        }
      } catch (error: any) {
        if (!isMounted) return;
        if (error.name === 'AbortError') return;
        
        // Retry logic
        if (retryCount < maxRetries && error.message === "timeout") {
          retryCount++;
          abortController = new AbortController();
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 4000);
          
          setTimeout(() => {
            if (isMounted) fetchWithRetry();
          }, delay);
          return;
        }

        // Final error
        if (isMounted) {
          setLoading(false);
        }
        
        console.error('Error fetching insights:', error);
      }
    };

    fetchWithRetry();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getConversionColor = (level: string) => {
    switch(level) {
      case "high": return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "medium": return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "low": return "bg-gray-500/10 text-gray-700 border-gray-500/20";
      default: return "bg-muted";
    }
  };

  const getUrgencyColor = (level: string) => {
    switch(level) {
      case "immediate": return "bg-red-500/10 text-red-700 border-red-500/20";
      case "short-term": return "bg-orange-500/10 text-orange-700 border-orange-500/20";
      case "long-term": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Persona Distribution */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Persona Distributie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(insights.personaDistribution).map(([persona, count]) => (
                <div key={persona} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{persona}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
              {Object.keys(insights.personaDistribution).length === 0 && (
                <p className="text-sm text-muted-foreground">Nog geen data</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Probability */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-emerald-600" />
              Conversie Kans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(insights.conversionProbability).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <Badge className={getConversionColor(level)}>
                    {level}
                  </Badge>
                  <span className="font-semibold">{count} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {insights.topServices.map(({ service, count }, idx) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-sm flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground">#{idx + 1}</span>
                    {service}
                  </span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
              {insights.topServices.length === 0 && (
                <p className="text-sm text-muted-foreground">Nog geen data</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Urgency Levels */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              Urgentie Niveaus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(insights.urgencyLevels).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <Badge className={getUrgencyColor(level)}>
                    {level}
                  </Badge>
                  <span className="font-semibold">{count} leads</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Indicators */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
              Budget Indicatoren
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(insights.budgetIndicators).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{level}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drone Interest */}
        <Card className="hover:shadow-lg transition-all border-sky-200 bg-sky-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plane className="h-5 w-5 text-sky-600" />
              🚁 Drone Content Interesse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Zeer geïnteresseerd</span>
                <Badge className="bg-sky-500/10 text-sky-700 border-sky-500/20">
                  {insights.droneInterest.high}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Misschien</span>
                <Badge variant="outline">{insights.droneInterest.medium}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weet niet</span>
                <Badge variant="outline">{insights.droneInterest.low}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Niet relevant</span>
                <Badge variant="outline">{insights.droneInterest.none}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Website Needs */}
        <Card className="hover:shadow-lg transition-all border-emerald-200 bg-emerald-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-emerald-600" />
              💻 Website Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hoge behoefte</span>
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                  {insights.websiteNeeds.high}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Integratie wens</span>
                <Badge variant="outline">{insights.websiteNeeds.medium}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Moderne website</span>
                <Badge variant="outline">{insights.websiteNeeds.none}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
