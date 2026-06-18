import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import SimplifiedAssessmentLeadCard from "./SimplifiedAssessmentLeadCard";
import LeadFilters from "./LeadFilters";

type AssessmentLead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  score: number;
  segment: string;
  status: string;
  notes: string | null;
  answers: any;
};

export default function AssessmentLeadsTable() {
  const [leads, setLeads] = useState<AssessmentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const { toast } = useToast();
  const pageSize = 25;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();
    let retryCount = 0;
    const maxRetries = 3;

    const fetchWithRetry = async () => {
      try {
        const { data, error } = await Promise.race([
          supabase
            .from("assessment_submissions")
            .select("*")
            .order("created_at", { ascending: false })
            .range(0, pageSize - 1)
            .abortSignal(abortController.signal),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 8000)
          ),
        ]) as any;

        if (!isMounted) return;

        if (error) {
          if (error.message?.includes("JWT")) {
            toast({
              title: "Session Expired",
              description: "Please log in again",
              variant: "destructive",
            });
            setTimeout(() => window.location.href = "/auth", 1500);
            return;
          }
          throw error;
        }
        setLeads(data || []);
        setHasMore((data || []).length === pageSize);
        setPage(1);
        setLoading(false);
      } catch (error: any) {
        if (!isMounted) return;
        if (error.name === 'AbortError') return;
        
        // Retry logic
        if (retryCount < maxRetries && error.message === "timeout") {
          retryCount++;
          abortController = new AbortController();
          const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
          
          setTimeout(() => {
            if (isMounted) fetchWithRetry();
          }, delay);
          return;
        }

        // Final error state
        if (isMounted) {
          setLoading(false);
          const retryFn = () => {
            setLoading(true);
            retryCount = 0;
            fetchWithRetry();
          };
          
          toast({
            title: "Connection Issue",
            description: "Could not load data.",
            variant: "destructive",
            action: <Button variant="outline" size="sm" onClick={retryFn}>Retry</Button>
          });
        }
      }
    };

    fetchWithRetry();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [toast]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const from = page * pageSize;
      const to = from + pageSize - 1;
      const { data, error } = await supabase
        .from("assessment_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, to);
      if (error) throw error;
      setLeads((prev) => [...prev, ...(data || [])]);
      setHasMore((data || []).length === pageSize);
      setPage((prev) => prev + 1);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load more", variant: "destructive" });
    } finally {
      setLoadingMore(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("assessment_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
      toast({ title: "Success", description: "Status updated" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("assessment_submissions")
        .update({ notes })
        .eq("id", id);

      if (error) throw error;

      setLeads(leads.map((lead) => (lead.id === id ? { ...lead, notes } : lead)));
      toast({ title: "Success", description: "Notes saved" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("assessment_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setLeads(leads.filter((lead) => lead.id !== id));
      toast({ title: "Success", description: "Lead deleted" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    }
  };

  // Filter and sort leads
  const filteredAndSortedLeads = leads
    .filter((lead) => {
      // Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          lead.name.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search) ||
          lead.company.toLowerCase().includes(search)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Assessment Leads</h2>
        <p className="text-muted-foreground">
          {filteredAndSortedLeads.length} of {leads.length} submissions
        </p>
      </div>

      <LeadFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="space-y-4">
        {filteredAndSortedLeads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No leads found matching your filters</p>
          </div>
        ) : (
          <>
            {filteredAndSortedLeads.map((lead) => (
              <SimplifiedAssessmentLeadCard
                key={lead.id}
                lead={lead}
                onStatusUpdate={updateStatus}
                onNotesUpdate={updateNotes}
                onDelete={deleteLead}
              />
            ))}
            {hasMore && (
              <div className="flex justify-center pt-2">
                <Button variant="secondary" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
