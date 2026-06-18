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
  AlertTriangle,
  MessageSquare,
  Trash2
} from "lucide-react";
import ServiceCategories from "./ServiceCategories";
import { detectUrgencyKeywords, recommendNextAction } from "@/lib/leadUtils";

interface ContactLeadCardProps {
  lead: any;
  onStatusUpdate: (id: string, status: string) => void;
  onNotesUpdate: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}

export default function ContactLeadCard({
  lead,
  onStatusUpdate,
  onNotesUpdate,
  onDelete,
}: ContactLeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [editingNotes, setEditingNotes] = useState(lead.notes || "");

  const hasUrgency = detectUrgencyKeywords(lead.message);
  const nextAction = recommendNextAction(lead, "contact");
  const messagePreview = lead.message?.substring(0, 120) + (lead.message?.length > 120 ? "..." : "");

  return (
    <Card className={`overflow-hidden border-l-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
      hasUrgency ? "border-l-red-500 animate-pulse-glow" : "border-l-blue-500"
    }`}>
      {/* Main Card Content */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {hasUrgency && (
                <Badge className="bg-red-500/10 text-red-700 border-red-500/20">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Urgent Request
                </Badge>
              )}
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">
                Contact Form
              </Badge>
            </div>
            <h3 className="text-lg font-bold truncate">{lead.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5" />
              <span className="truncate">{lead.company}</span>
            </div>
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

        {/* Services Requested */}
        {!expanded && (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">Interested In:</p>
              <ServiceCategories workTypes={lead.work_types || []} />
            </div>

            {/* Message Preview */}
            <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50">
              <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground italic flex-1">
                &ldquo;{messagePreview}&rdquo;
              </p>
            </div>

            {/* Suggested Action */}
            <div className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
              <span className="text-sm">💡</span>
              <p className="text-xs text-muted-foreground flex-1">
                <span className="font-medium">Suggested:</span> {nextAction}
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
          {/* Full Services List */}
          <div>
            <h4 className="font-semibold mb-3">All Requested Services</h4>
            <ServiceCategories workTypes={lead.work_types || []} />
          </div>

          {/* Full Message */}
          <div>
            <h4 className="font-semibold mb-2">Full Message</h4>
            <div className="p-3 rounded-md bg-background border">
              <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
            </div>
          </div>

          {/* Suggested Action */}
          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              💡 Recommended Next Step
            </p>
            <p className="text-sm font-medium text-blue-700">{nextAction}</p>
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
