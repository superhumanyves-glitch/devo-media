import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Building, Calendar, ChevronDown, ChevronUp, Trash2, Save, AlertTriangle } from "lucide-react";

interface ContactLead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  message: string;
  work_types: string[];
  status: string;
  created_at: string;
  notes: string | null;
}

interface SimplifiedContactLeadCardProps {
  lead: ContactLead;
  onStatusUpdate: (id: string, status: string) => void;
  onNotesUpdate: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export default function SimplifiedContactLeadCard({ lead, onStatusUpdate, onNotesUpdate, onDelete }: SimplifiedContactLeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [localNotes, setLocalNotes] = useState(lead.notes || "");

  const urgencyKeywords = ["urgent", "snel", "asap", "spoed", "direct", "dringend", "zo snel mogelijk"];
  const isUrgent = urgencyKeywords.some(keyword => lead.message.toLowerCase().includes(keyword));

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
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

          <div className="space-y-2">
            {isUrgent && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                ⚠️ Urgent
              </Badge>
            )}
            <div className="flex flex-wrap gap-2">
              {lead.work_types.map((service, idx) => (
                <Badge key={idx} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  {service}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{lead.message}</p>
          </div>

          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="w-full justify-between hover:bg-muted">
            <span className="text-sm font-medium">{expanded ? "Verberg details" : "Bekijk volledig bericht"}</span>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {expanded && (
            <div className="pt-4 border-t space-y-4 animate-fade-in">
              <div>
                <h4 className="font-semibold text-sm mb-2">Volledig Bericht</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lead.message}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Admin Notities</label>
                <Textarea value={localNotes} onChange={(e) => setLocalNotes(e.target.value)} placeholder="Voeg interne notities toe..." className="min-h-[80px] text-sm" />
                {localNotes !== (lead.notes || "") && (
                  <Button onClick={() => onNotesUpdate(lead.id, localNotes)} size="sm" className="w-full">
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Notities opslaan
                  </Button>
                )}
              </div>

              <Button onClick={() => confirm(`Weet je zeker dat je ${lead.name} wilt verwijderen?`) && onDelete(lead.id)} variant="destructive" size="sm" className="w-full">
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
