import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "50370000000"; // Replace with actual number
const WHATSAPP_MESSAGE = "¡Hola! Me interesa obtener información sobre los paquetes de viaje de Mundo Travel.";

const WhatsAppButton = () => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl gradient-tropical hover:opacity-90 transition-all animate-pulse-glow"
      size="icon"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-secondary-foreground" />
    </Button>
  );
};

export default WhatsAppButton;
