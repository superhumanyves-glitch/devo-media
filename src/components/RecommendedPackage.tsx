import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";

interface RecommendedPackageProps {
  title: string;
  description: string;
  features: string[];
  cta: string;
  onAction: () => void;
}

const RecommendedPackage = ({ title, description, features, cta, onAction }: RecommendedPackageProps) => {
  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2 w-fit">
          Aanbevolen voor jou
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onAction} size="lg" className="w-full">
          {cta}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedPackage;
