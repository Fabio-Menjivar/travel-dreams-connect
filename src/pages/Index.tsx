import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LocalDestinations from "@/components/LocalDestinations";
import InternationalDestinations from "@/components/InternationalDestinations";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>("");

  const handleContactClick = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDestinationSelect = (destination: string) => {
    // Map destination names to form values
    const destinationMap: Record<string, string> = {
      "Surf City": "surf-city",
      "Ruta de las Flores": "ruta-flores",
      "Volcanes de El Salvador": "volcanes",
      "Europa Mágica": "europa",
      "Roatán Paradise": "roatan",
      "Disney World": "disney",
    };

    setSelectedDestination(destinationMap[destination] || "otro");
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection onContactClick={handleContactClick} />
        <LocalDestinations onDestinationSelect={handleDestinationSelect} />
        <InternationalDestinations onDestinationSelect={handleDestinationSelect} />
        <ContactForm preselectedDestination={selectedDestination} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
