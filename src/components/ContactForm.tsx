import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useTranslation, Trans } from "react-i18next";
import type { TFunction } from "i18next";
import { ArrowRight, Check, MessageCircle, Loader2, ChevronLeft } from "lucide-react";
import logo from "@/assets/devo-logo.png";
import checkGradient from "@/assets/check-gradient.png";
import whatsappLogo from "@/assets/whatsapp-logo.svg.webp";
import chatIcon from "@/assets/icon-chat-3d.png";

const buildContactSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t("contactForm.validation.nameRequired") })
      .max(100, { message: t("contactForm.validation.nameMax") }),
    company: z
      .string()
      .trim()
      .min(1, { message: t("contactForm.validation.companyRequired") })
      .max(100, { message: t("contactForm.validation.companyMax") }),
    email: z
      .string()
      .trim()
      .email({ message: t("contactForm.validation.emailInvalid") })
      .max(255, { message: t("contactForm.validation.emailMax") }),
    phone: z
      .string()
      .trim()
      .min(6, { message: t("contactForm.validation.phoneRequired") })
      .max(20, { message: t("contactForm.validation.phoneMax") }),
    workTypes: z
      .array(z.string())
      .min(1, { message: t("contactForm.validation.workTypesMin") }),
    message: z
      .string()
      .trim()
      .min(1, { message: t("contactForm.validation.messageRequired") })
      .max(1000, { message: t("contactForm.validation.messageMax") }),
  });

const monthlyPackages = [
  "Maandelijks Pakket - Content Starter",
  "Maandelijks Pakket - Content Growth",
  "Maandelijks Pakket - Content Authority",
  "Maandelijks Pakket - Content Starter (met Social Media Management)",
  "Maandelijks Pakket - Content Growth (met Social Media Management)",
  "Maandelijks Pakket - Content Authority (met Social Media Management)",
];

const individualServices = [
  "Single Video",
  "Aftermovie / Eventvideo",
  "Drone/FPV Video",
];

const additionalServices = [
  "Video-opnames zonder montage",
  "Professionele videomontage",
  "Social Media Management",
  "Website Development",
  "Anders / Nog niet zeker",
];

interface ContactFormProps { showTrigger?: boolean }
const ContactForm = ({ showTrigger = true }: ContactFormProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const contactSchema = useMemo(() => buildContactSchema(t), [t]);

  // Canonical values stay language-independent (used for submission and the
  // package pre-select); only the visible labels are translated.
  const monthlyPackageOptions = useMemo(() => {
    const labels = t("contactForm.monthlyPackageLabels", { returnObjects: true }) as string[];
    return monthlyPackages.map((value, i) => ({ value, label: labels[i] ?? value }));
  }, [t]);
  const individualServiceOptions = useMemo(() => {
    const labels = t("contactForm.individualServiceLabels", { returnObjects: true }) as string[];
    return individualServices.map((value, i) => ({ value, label: labels[i] ?? value }));
  }, [t]);
  const additionalServiceOptions = useMemo(() => {
    const labels = t("contactForm.additionalServiceLabels", { returnObjects: true }) as string[];
    return additionalServices.map((value, i) => ({ value, label: labels[i] ?? value }));
  }, [t]);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    workTypes: [] as string[],
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleOpenForm = (event: CustomEvent<{ service?: string }>) => {
      const service = (event as any)?.detail?.service as string | undefined;
      setSavedScrollPosition(window.scrollY);
      setIsOpen(true);
      if (service) {
        setFormData((prev) => ({
          ...prev,
          workTypes: [service],
        }));
      }
    };

    window.addEventListener('openContactForm' as any, handleOpenForm);
    return () => {
      window.removeEventListener('openContactForm' as any, handleOpenForm);
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const y = savedScrollPosition;
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: 'auto' });
      });
      // Reset all states when closing
      setShowSuccess(false);
      setShowForm(false);
    } else {
      setSavedScrollPosition(window.scrollY);
    }
    setIsOpen(open);
  };

  const validateField = (field: string, value: any) => {
    try {
      contactSchema.pick({ [field]: true } as any).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      contactSchema.parse(formData);

      // Send the lead via the serverless email endpoint
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone || '',
          workTypes: formData.workTypes,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Email sending failed');
      }

      setShowSuccess(true);
      setIsSubmitting(false);

      // Reset form after showing success
      setTimeout(() => {
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          workTypes: [],
          message: "",
        });
        setErrors({});
        setTouched({});
        setShowSuccess(false);
        setShowForm(false);
        setIsOpen(false);
      }, 4000);
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        setTouched({
          name: true,
          company: true,
          email: true,
          workTypes: true,
          message: true,
        });

        toast({
          title: t("contactForm.toastErrorTitle"),
          description: t("contactForm.toastErrorDesc"),
          variant: "destructive",
        });
      } else {
        toast({
          title: t("contactForm.toastFailTitle"),
          description: t("contactForm.toastFailDesc"),
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleCheckboxChange = (workType: string, checked: boolean) => {
    const newWorkTypes = checked
      ? [...formData.workTypes, workType]
      : formData.workTypes.filter((t) => t !== workType);
    
    setFormData((prev) => ({ ...prev, workTypes: newWorkTypes }));
    if (touched.workTypes) {
      validateField("workTypes", newWorkTypes);
    }
  };

  const isFieldValid = (field: string) => {
    return touched[field] && !errors[field] && formData[field as keyof typeof formData];
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <Button size="lg" className="shadow-glow">
            {t("contactForm.triggerButton")} <ArrowRight className="ml-2" />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent 
        side="right" 
        className="w-full sm:w-[90vw] sm:max-w-lg overflow-y-auto"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <div className="inline-flex items-center justify-center mb-6">
              <img src={checkGradient} alt="Success" className="w-24 h-24" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              {t("contactForm.successTitle")}
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground mb-3">
              {t("contactForm.successBody")}
            </p>

            <p className="text-base text-muted-foreground">
              <Trans
                i18nKey="contactForm.successFollowup"
                components={{ b: <span className="font-bold text-foreground" /> }}
              />
            </p>
          </div>
        ) : !showForm ? (
          /* Choice Screen */
          <>
            <SheetHeader className="mb-6 sm:mb-8">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img src={logo} alt="Devo Media" className="h-10 sm:h-12" />
              </div>
              <SheetTitle className="text-2xl sm:text-3xl text-center font-black">
                {t("contactForm.choiceTitle")}
              </SheetTitle>
              <SheetDescription className="text-sm sm:text-base text-center">
                {t("contactForm.choiceSubtitle")}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              {/* WhatsApp Option */}
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group">
                <a
                  href={`https://wa.me/31610322231?text=${encodeURIComponent(
                    t("contactForm.whatsappMessage")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                        <img src={whatsappLogo} alt="WhatsApp" className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {t("contactForm.whatsappTitle")}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t("contactForm.whatsappDesc")}
                        </p>
                        <Button
                          type="button"
                          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                          size="lg"
                        >
                          {t("contactForm.whatsappButton")}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </a>
              </Card>

              {/* Form Option */}
              <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group">
                <CardContent 
                  className="p-6"
                  onClick={() => setShowForm(true)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <img src={chatIcon} alt={t("contactForm.formCardTitle")} className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {t("contactForm.formCardTitle")}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("contactForm.formCardDesc")}
                      </p>
                      <Button
                        type="button"
                        className="w-full"
                        size="lg"
                      >
                        {t("contactForm.formCardButton")}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          /* Form Screen */
          <>
            <SheetHeader className="mb-4 sm:mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
                className="w-fit mb-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {t("contactForm.back")}
              </Button>
              <div className="flex justify-center mb-3 sm:mb-4">
                <img src={logo} alt="Devo Media" className="h-10 sm:h-12" />
              </div>
              <SheetTitle className="text-xl sm:text-2xl text-center">{t("contactForm.formTitle")}</SheetTitle>
              <SheetDescription className="text-sm sm:text-base text-center">
                {t("contactForm.formSubtitle")}
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="relative">
              <Input
                name="name"
                placeholder={t("contactForm.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`rounded-full pr-10 ${
                  errors.name && touched.name ? "border-destructive" : ""
                }`}
                aria-required="true"
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              />
              {isFieldValid("name") && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" aria-label={t("contactForm.fieldValid")} />
              )}
              {errors.name && touched.name && (
                <p id="name-error" className="text-xs text-destructive mt-1 ml-4" role="alert">{errors.name}</p>
              )}
            </div>

            {/* Company Field */}
            <div className="relative">
              <Input
                name="company"
                placeholder={t("contactForm.companyPlaceholder")}
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`rounded-full pr-10 ${
                  errors.company && touched.company ? "border-destructive" : ""
                }`}
              />
              {isFieldValid("company") && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              )}
              {errors.company && touched.company && (
                <p className="text-xs text-destructive mt-1 ml-4">{errors.company}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <Input
                type="email"
                name="email"
                placeholder={t("contactForm.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`rounded-full pr-10 ${
                  errors.email && touched.email ? "border-destructive" : ""
                }`}
              />
              {isFieldValid("email") && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              )}
              {errors.email && touched.email && (
                <p className="text-xs text-destructive mt-1 ml-4">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <Input
                type="tel"
                name="phone"
                placeholder={t("contactForm.phonePlaceholder")}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`rounded-full pr-10 ${
                  errors.phone && touched.phone ? "border-destructive" : ""
                }`}
              />
              {isFieldValid("phone") && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              )}
              {errors.phone && touched.phone && (
                <p className="text-xs text-destructive mt-1 ml-4">{errors.phone}</p>
              )}
            </div>

            {/* Work Type Checkboxes */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">
                  {t("contactForm.workTypeLabel")}
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("contactForm.workTypeHint")}
                </p>
              </div>

              {/* Monthly Packages Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{t("contactForm.monthlyPackagesHeading")}</h4>
                {monthlyPackageOptions.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                  >
                    <Checkbox
                      id={option.value}
                      checked={formData.workTypes.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(option.value, checked as boolean)
                      }
                    />
                    <span className="text-sm flex-1">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Individual Services Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{t("contactForm.individualServicesHeading")}</h4>
                {individualServiceOptions.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                  >
                    <Checkbox
                      id={option.value}
                      checked={formData.workTypes.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(option.value, checked as boolean)
                      }
                    />
                    <span className="text-sm flex-1">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Additional Services Section */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">{t("contactForm.additionalServicesHeading")}</h4>
                {additionalServiceOptions.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={option.value}
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-all"
                  >
                    <Checkbox
                      id={option.value}
                      checked={formData.workTypes.includes(option.value)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(option.value, checked as boolean)
                      }
                    />
                    <span className="text-sm flex-1">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {errors.workTypes && touched.workTypes && (
                <p className="text-xs text-destructive">{errors.workTypes}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <Textarea
                name="message"
                placeholder={t("contactForm.messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                className={`rounded-3xl ${
                  errors.message && touched.message ? "border-destructive" : ""
                }`}
              />
              {errors.message && touched.message && (
                <p className="text-xs text-destructive mt-1 ml-4">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("contactForm.submitting")}
              </>
            ) : (
              <>
                {t("contactForm.submit")}
                <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </>
            )}
          </Button>
        </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ContactForm;
