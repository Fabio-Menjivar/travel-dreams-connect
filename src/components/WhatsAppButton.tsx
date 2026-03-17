import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nContext";

const WHATSAPP_NUMBER = "50370000000"; // Replace with actual number

const WhatsAppButton = () => {
  const { t } = useI18n();

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(t("whatsapp.defaultMessage"));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl gradient-tropical hover:opacity-90 transition-all animate-pulse-glow"
      size="icon"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <MessageCircle className="w-8 h-8 text-secondary-foreground" />
    </Button>
  );
};

export default WhatsAppButton;
