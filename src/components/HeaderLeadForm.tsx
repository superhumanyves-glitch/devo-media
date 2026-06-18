import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { useTranslation } from "react-i18next";

const emailSchema = z.string().trim().email().max(255);

interface HeaderLeadFormProps {
  /** Visual variant: "inline" for the desktop nav bar, "stacked" for the mobile menu. */
  variant?: "inline" | "stacked";
  onSuccess?: () => void;
}

const HeaderLeadForm = ({ variant = "inline", onSuccess }: HeaderLeadFormProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(t("header.lead.invalidEmail"));
      return;
    }
    setError("");
    setIsSubmitting(true);

    const lead = {
      name: t("header.lead.defaultName"),
      company: "—",
      email: parsed.data,
      phone: null as string | null,
      work_types: [t("header.lead.workType")],
      message: t("header.lead.defaultMessage"),
      status: "new",
    };

    try {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert(lead);
      if (dbError) throw dbError;

      // Fire-and-forget the notification email; don't block success on it.
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
      setEmail("");
      onSuccess?.();
    } catch (err) {
      console.error("Header lead submission failed:", err);
      setError(t("header.lead.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        className={`flex items-center gap-2 text-sm font-medium text-primary ${
          variant === "stacked" ? "justify-center py-2" : ""
        }`}
        role="status"
      >
        <Check className="w-4 h-4 shrink-0" />
        <span>{t("header.lead.success")}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        variant === "stacked"
          ? "flex flex-col gap-2 w-full"
          : "relative flex items-center gap-2"
      }
      noValidate
    >
      <div className={variant === "stacked" ? "w-full" : "relative"}>
        <Input
          type="email"
          name="leadEmail"
          inputMode="email"
          autoComplete="email"
          placeholder={t("header.lead.placeholder")}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-label={t("header.lead.placeholder")}
          aria-invalid={!!error}
          className={`rounded-full ${variant === "inline" ? "h-9 w-44 xl:w-52" : "h-11"} ${
            error ? "border-destructive" : ""
          }`}
        />
      </div>
      <Button
        type="submit"
        size={variant === "stacked" ? "lg" : "sm"}
        disabled={isSubmitting}
        className={`shrink-0 ${variant === "stacked" ? "w-full" : ""}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            {t("header.lead.sending")}
          </>
        ) : (
          <>
            {t("header.lead.cta")}
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </>
        )}
      </Button>
      {error && (
        <p
          className={`text-xs text-destructive ${
            variant === "inline" ? "absolute top-full left-4 mt-1 whitespace-nowrap" : ""
          }`}
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
};

export default HeaderLeadForm;
