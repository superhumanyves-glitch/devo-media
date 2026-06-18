import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { useTranslation } from "react-i18next";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  service: z.string().trim().min(1),
});

// Keys map to hero.quote.services.* in the locale files.
const SERVICE_KEYS = [
  "package8",
  "package12",
  "package16",
  "singleVideo",
  "drone",
  "socialMedia",
  "website",
  "other",
] as const;

const HeroQuoteForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, email, service });
    if (!result.success) {
      const fieldErrors: Record<string, boolean> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = true;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const serviceLabel = t(`hero.quote.services.${service}`);
    const lead = {
      name: result.data.name,
      company: "—",
      email: result.data.email,
      phone: null as string | null,
      work_types: [serviceLabel],
      message: t("hero.quote.messageTemplate", { service: serviceLabel }),
      status: "new",
    };

    try {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert(lead);
      if (dbError) throw dbError;

      supabase.functions
        .invoke("send-contact-email", {
          body: {
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: "",
            workTypes: lead.work_types,
            message: lead.message,
          },
        })
        .catch((err) => console.error("Email function error:", err));

      setSuccess(true);
    } catch (err) {
      console.error("Hero quote submission failed:", err);
      setErrors({ submit: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          {t("hero.quote.successTitle")}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t("hero.quote.successBody")}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-5 sm:p-6 md:p-7 shadow-xl text-left">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
        {t("hero.quote.title")}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">
        {t("hero.quote.subtitle")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="hero-quote-name" className="text-xs">
              {t("hero.quote.nameLabel")}
            </Label>
            <Input
              id="hero-quote-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("hero.quote.namePlaceholder")}
              autoComplete="name"
              className={errors.name ? "border-destructive" : ""}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-quote-email" className="text-xs">
              {t("hero.quote.emailLabel")}
            </Label>
            <Input
              id="hero-quote-email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("hero.quote.emailPlaceholder")}
              autoComplete="email"
              className={errors.email ? "border-destructive" : ""}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="hero-quote-service" className="text-xs">
            {t("hero.quote.serviceLabel")}
          </Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger
              id="hero-quote-service"
              className={errors.service ? "border-destructive" : ""}
            >
              <SelectValue placeholder={t("hero.quote.servicePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {SERVICE_KEYS.map((key) => (
                <SelectItem key={key} value={key}>
                  {t(`hero.quote.services.${key}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full group gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t("hero.quote.sending")}
            </>
          ) : (
            <>
              {t("hero.quote.cta")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>

        {errors.submit && (
          <p className="text-xs text-destructive text-center" role="alert">
            {t("hero.quote.error")}
          </p>
        )}

        <p className="text-[11px] sm:text-xs text-muted-foreground text-center">
          {t("hero.quote.reassurance")}
        </p>
      </form>
    </div>
  );
};

export default HeroQuoteForm;
