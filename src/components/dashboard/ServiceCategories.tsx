import { Badge } from "@/components/ui/badge";
import { Package, Video, Plus } from "lucide-react";

interface ServiceCategoriesProps {
  workTypes: string[];
}

export default function ServiceCategories({ workTypes }: ServiceCategoriesProps) {
  // Categorize services
  const monthlyPackages = workTypes.filter(type => 
    type.toLowerCase().includes("pakket") || 
    type.toLowerCase().includes("package") ||
    type.toLowerCase().includes("maand")
  );
  
  const singleServices = workTypes.filter(type => 
    type.toLowerCase().includes("aftermovie") ||
    type.toLowerCase().includes("opening") ||
    type.toLowerCase().includes("bedrijfsfilm") ||
    type.toLowerCase().includes("productfoto")
  );
  
  const additionalServices = workTypes.filter(type => 
    !monthlyPackages.includes(type) && !singleServices.includes(type)
  );

  return (
    <div className="space-y-3">
      {monthlyPackages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold text-muted-foreground">Monthly Packages</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {monthlyPackages.map((service, idx) => (
              <Badge 
                key={idx}
                className="bg-primary/10 text-primary border-primary/20"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {singleServices.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Video className="h-4 w-4 text-blue-600" />
            <p className="text-xs font-semibold text-muted-foreground">Single Productions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {singleServices.map((service, idx) => (
              <Badge 
                key={idx}
                className="bg-blue-500/10 text-blue-700 border-blue-500/20"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {additionalServices.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plus className="h-4 w-4 text-green-600" />
            <p className="text-xs font-semibold text-muted-foreground">Additional Services</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {additionalServices.map((service, idx) => (
              <Badge 
                key={idx}
                className="bg-green-500/10 text-green-700 border-green-500/20"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {workTypes.length === 0 && (
        <p className="text-sm text-muted-foreground">No services selected</p>
      )}
    </div>
  );
}
