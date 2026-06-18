import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AssessmentLeadsTable from "@/components/dashboard/AssessmentLeadsTable";
import ContactLeadsTable from "@/components/dashboard/ContactLeadsTable";
import { LogOut, Shield, ClipboardList, Mail } from "lucide-react";
import devoLogo from "@/assets/devo-logo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({ today: 0, week: 0, total: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const [assessments, contacts] = await Promise.all([
          supabase.from("assessment_submissions").select("created_at", { count: "exact" }),
          supabase.from("contact_submissions").select("created_at", { count: "exact" })
        ]);

        const allLeads = [
          ...(assessments.data || []),
          ...(contacts.data || [])
        ];

        setStats({
          today: allLeads.filter(l => new Date(l.created_at) >= today).length,
          week: allLeads.filter(l => new Date(l.created_at) >= weekAgo).length,
          total: allLeads.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img 
              src={devoLogo} 
              alt="Devo Media" 
              className="h-8 sm:h-10 w-auto flex-shrink-0 transition-transform hover:scale-105"
            />
            <div className="h-6 sm:h-8 w-px bg-border flex-shrink-0" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground min-w-0">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                <span className="hidden sm:inline">Admin Dashboard</span>
                <span className="sm:hidden">Admin</span>
              </span>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm" className="hover-scale flex-shrink-0">
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Simple Stats Header */}
        <div className="mb-6 p-4 bg-card rounded-lg border shadow-sm animate-fade-in">
          <p className="text-sm text-muted-foreground text-center">
            📊 Vandaag: <span className="font-semibold text-foreground">{stats.today} nieuwe</span> | 
            Deze week: <span className="font-semibold text-foreground">{stats.week} nieuwe</span> | 
            Totaal: <span className="font-semibold text-foreground">{stats.total} leads</span>
          </p>
        </div>

        <Tabs defaultValue="assessments" className="space-y-6 sm:space-y-8 animate-slide-up">
          <TabsList className="w-full sm:w-auto grid grid-cols-2 gap-2 h-auto p-1 bg-secondary/50">
            <TabsTrigger 
              value="assessments" 
              className="flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <ClipboardList className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">Assessments</span>
                <span className="sm:hidden">Quiz</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Mail className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">Contacts</span>
                <span className="sm:hidden">Mail</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessments" className="mt-6 animate-fade-in">
            <AssessmentLeadsTable key="assessments" />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6 animate-fade-in">
            <ContactLeadsTable key="contacts" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
