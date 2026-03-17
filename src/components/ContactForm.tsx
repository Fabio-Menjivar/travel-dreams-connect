import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, AlertCircle, Send, Loader2, Calendar, User, Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n/I18nContext";

const contactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: t("contactForm.zod.nameMin") })
      .max(100, { message: t("contactForm.zod.nameMax") }),
    email: z
      .string()
      .trim()
      .email({ message: t("contactForm.zod.emailInvalid") })
      .max(255, { message: t("contactForm.zod.emailMax") }),
    phone: z
      .string()
      .trim()
      .min(8, { message: t("contactForm.zod.phoneMin") })
      .max(20, { message: t("contactForm.zod.phoneMax") })
      .regex(/^[0-9+\-\s()]+$/, { message: t("contactForm.zod.phoneFormat") }),
    destination: z.string().min(1, { message: t("contactForm.zod.destinationRequired") }),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    message: z
      .string()
      .trim()
      .max(1000, { message: t("contactForm.zod.messageMax") })
      .optional(),
  });

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  preselectedDestination?: string;
}

const destinations = (t: (key: string) => string) => [
  { value: "surf-city", label: t("contactForm.destinations.surfCity") },
  { value: "ruta-flores", label: t("contactForm.destinations.rutaFlores") },
  { value: "volcanes", label: t("contactForm.destinations.volcanes") },
  { value: "europa", label: t("contactForm.destinations.europa") },
  { value: "roatan", label: t("contactForm.destinations.roatan") },
  { value: "disney", label: t("contactForm.destinations.disney") },
  { value: "otro", label: t("contactForm.destinations.other") },
];

const ContactForm = ({ preselectedDestination }: ContactFormProps) => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useI18n();

  // Get today's date in YYYY-MM-DD format for min date restriction
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema(t)),
    defaultValues: {
      destination: preselectedDestination || "",
    },
  });

  const checkInValue = watch("checkIn");

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          destination: destinations(t).find((d) => d.value === data.destination)?.label || data.destination,
          checkIn: data.checkIn || t("contactForm.emailDefaults.checkIn"),
          checkOut: data.checkOut || t("contactForm.emailDefaults.checkOut"),
          message: data.message || t("contactForm.emailDefaults.message"),
        },
      });

      if (error) throw error;

      setSubmitStatus("success");
      reset();

      // Reset to idle after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      console.error("Error sending form:", err);
      setSubmitStatus("error");
      setErrorMessage(t("contactForm.genericError"));

      // Reset to idle after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("contactForm.badge")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              {t("contactForm.titlePrefix")}{" "}
              <span className="text-gradient-ocean">{t("contactForm.titleHighlight")}</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              {t("contactForm.description")}
            </p>
          </div>

          {/* Form card */}
          <Card className="border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-display">{t("contactForm.cardTitle")}</CardTitle>
              <CardDescription>
                {t("contactForm.cardDescription")}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {t("contactForm.nameLabel")}
                  </Label>
                  <Input
                    id="name"
                    placeholder={t("contactForm.namePlaceholder")}
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {t("contactForm.emailLabel")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("contactForm.emailPlaceholder")}
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {t("contactForm.phoneLabel")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("contactForm.phonePlaceholder")}
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Destination select */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {t("contactForm.destinationLabel")}
                  </Label>
                  <Select
                    onValueChange={(value) => setValue("destination", value)}
                    defaultValue={preselectedDestination}
                  >
                    <SelectTrigger className={errors.destination ? "border-destructive" : ""}>
                      <SelectValue placeholder={t("contactForm.destinationPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations(t).map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.destination && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.destination.message}
                    </p>
                  )}
                </div>

                {/* Date fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {t("contactForm.checkInLabel")}
                    </Label>
                    <Input
                      id="checkIn"
                      type="date"
                      min={today}
                      {...register("checkIn")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkOut" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {t("contactForm.checkOutLabel")}
                    </Label>
                    <Input
                      id="checkOut"
                      type="date"
                      min={checkInValue || today}
                      {...register("checkOut")}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <Label htmlFor="message">{t("contactForm.messageLabel")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("contactForm.messagePlaceholder")}
                    rows={4}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-ocean text-primary-foreground hover:opacity-90 transition-opacity"
                  disabled={submitStatus === "loading"}
                >
                  {submitStatus === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t("contactForm.submitLoading")}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t("contactForm.submitDefault")}
                    </>
                  )}
                </Button>

                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                      <Check className="w-6 h-6 text-success-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-success">{t("contactForm.successTitle")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("contactForm.successDescription")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-destructive-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-destructive">{t("contactForm.errorTitle")}</p>
                      <p className="text-sm text-muted-foreground">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
