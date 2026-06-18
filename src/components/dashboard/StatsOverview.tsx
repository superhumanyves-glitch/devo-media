import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, TrendingUp, CheckCircle, Plane, Globe, Target, CalendarDays } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { getStaggeredAnimationStyle } from "@/lib/animations";

export default function StatsOverview() {
  const [stats, setStats] = useState({
    totalAssessments: 0,
    totalContacts: 0,
    newLeads: 0,
    convertedLeads: 0,
    droneInterestLeads: 0,
    websiteOpportunities: 0,
    highConversionLeads: 0,
    weeklyLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Count up animations for each stat (only animate when in view)
  const totalAssessmentsCount = useCountUp({ end: isInView ? stats.totalAssessments : 0, duration: 1500 });
  const totalContactsCount = useCountUp({ end: isInView ? stats.totalContacts : 0, duration: 1500 });
  const newLeadsCount = useCountUp({ end: isInView ? stats.newLeads : 0, duration: 1500 });
  const convertedLeadsCount = useCountUp({ end: isInView ? stats.convertedLeads : 0, duration: 1500 });
  const droneInterestCount = useCountUp({ end: isInView ? stats.droneInterestLeads : 0, duration: 1500 });
  const websiteOpportunitiesCount = useCountUp({ end: isInView ? stats.websiteOpportunities : 0, duration: 1500 });
  const highConversionCount = useCountUp({ end: isInView ? stats.highConversionLeads : 0, duration: 1500 });
  const weeklyLeadsCount = useCountUp({ end: isInView ? stats.weeklyLeads : 0, duration: 1500 });

  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();
    let retryCount = 0;
    const maxRetries = 2;

    const fetchWithRetry = async () => {
      try {
        setLoading(true);
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const queries = Promise.all([
          supabase.from("assessment_submissions").select("*", { count: "exact", head: true }).abortSignal(abortController.signal),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }).abortSignal(abortController.signal),
          supabase.from("assessment_submissions").select("*", { count: "exact", head: true }).eq("status", "new").abortSignal(abortController.signal),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new").abortSignal(abortController.signal),
          supabase.from("assessment_submissions").select("*", { count: "exact", head: true }).eq("status", "converted").abortSignal(abortController.signal),
          supabase.from("assessment_submissions").select("*", { count: "exact", head: true }).eq("conversion_probability", "high").abortSignal(abortController.signal),
          supabase.from("assessment_submissions").select("*", { count: "exact", head: true }).gte("created_at", oneWeekAgo.toISOString()).abortSignal(abortController.signal),
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }).gte("created_at", oneWeekAgo.toISOString()).abortSignal(abortController.signal),
          supabase.from("assessment_submissions").select("answers").abortSignal(abortController.signal)
        ]);

        const results = await Promise.race([
          queries,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 10000)
          ),
        ]) as any[];

        if (!isMounted) return;

        const [
          assessmentResult,
          contactResult,
          newAssessmentResult,
          newContactResult,
          convertedResult,
          highConversionResult,
          weeklyAssessmentsResult,
          weeklyContactsResult,
          allAssessments
        ] = results;

        let droneInterest = 0;
        let websiteNeeds = 0;
        
        if (allAssessments.data) {
          allAssessments.data.forEach((lead: any) => {
            if (lead.answers && typeof lead.answers === 'object' && !Array.isArray(lead.answers)) {
              const answers = lead.answers as Record<string, any>;
              if (answers.q12 === "very" || answers.q12 === "maybe") {
                droneInterest++;
              }
              if (answers.q13 === "none" || answers.q13 === "outdated" || answers.q13 === "integrate") {
                websiteNeeds++;
              }
            }
          });
        }

        if (isMounted) {
          setStats({
            totalAssessments: assessmentResult.count || 0,
            totalContacts: contactResult.count || 0,
            newLeads: (newAssessmentResult.count || 0) + (newContactResult.count || 0),
            convertedLeads: convertedResult.count || 0,
            droneInterestLeads: droneInterest,
            websiteOpportunities: websiteNeeds,
            highConversionLeads: highConversionResult.count || 0,
            weeklyLeads: (weeklyAssessmentsResult.count || 0) + (weeklyContactsResult.count || 0),
          });
          setLoading(false);
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

        // Final error - show zero stats
        if (isMounted) {
          setLoading(false);
        }
        
        if (import.meta.env.DEV) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchWithRetry();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const statCards = [
    {
      title: "Total Assessments",
      value: stats.totalAssessments,
      displayValue: totalAssessmentsCount,
      icon: ClipboardList,
      description: "Assessment submissions",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      displayValue: totalContactsCount,
      icon: Users,
      description: "Contact form submissions",
      color: "text-purple-600",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      displayValue: newLeadsCount,
      icon: TrendingUp,
      description: "Awaiting first contact",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Converted",
      value: stats.convertedLeads,
      displayValue: convertedLeadsCount,
      icon: CheckCircle,
      description: "Successfully converted",
      color: "text-green-600",
      bgColor: "bg-green-500/10"
    },
    {
      title: "🚁 Drone Interest",
      value: stats.droneInterestLeads,
      displayValue: droneInterestCount,
      icon: Plane,
      description: "Interested in drone content",
      color: "text-sky-600",
      bgColor: "bg-sky-500/10"
    },
    {
      title: "💻 Website Opportunities",
      value: stats.websiteOpportunities,
      displayValue: websiteOpportunitiesCount,
      icon: Globe,
      description: "Need website services",
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "High Conversion",
      value: stats.highConversionLeads,
      displayValue: highConversionCount,
      icon: Target,
      description: "High probability leads",
      color: "text-amber-600",
      bgColor: "bg-amber-500/10"
    },
    {
      title: "This Week",
      value: stats.weeklyLeads,
      displayValue: weeklyLeadsCount,
      icon: CalendarDays,
      description: "New leads this week",
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10"
    },
  ];

  return (
    <div ref={ref} className="space-y-6">
      <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Your leads and performance at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card 
            key={stat.title} 
            className={`overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={getStaggeredAnimationStyle(index, 100)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-full ${stat.bgColor} flex items-center justify-center ${stat.color} transition-transform duration-300 hover:scale-110`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton className="h-8 w-16 mb-1 animate-shimmer" />
                  <Skeleton className="h-4 w-32 animate-shimmer" />
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold mb-1 transition-all">
                    {stat.displayValue}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
