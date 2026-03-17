import DestinationCard from "./DestinationCard";
import { Globe, Plane, Castle, Sparkles } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

interface InternationalDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

const destinations = [
  {
    id: "europa",
    title: "Europa Mágica",
    locationKey: "internationalDestinations.europa.location",
    descriptionKey: "internationalDestinations.europa.description",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    priceKey: "internationalDestinations.europa.price",
    durationKey: "internationalDestinations.europa.duration",
    icon: Castle,
  },
  {
    id: "roatan",
    title: "Roatán Paradise",
    locationKey: "internationalDestinations.roatan.location",
    descriptionKey: "internationalDestinations.roatan.description",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    priceKey: "internationalDestinations.roatan.price",
    durationKey: "internationalDestinations.roatan.duration",
    icon: Globe,
  },
  {
    id: "disney",
    title: "Disney World",
    locationKey: "internationalDestinations.disney.location",
    descriptionKey: "internationalDestinations.disney.description",
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&auto=format&fit=crop&q=80",
    priceKey: "internationalDestinations.disney.price",
    durationKey: "internationalDestinations.disney.duration",
    icon: Sparkles,
  },
];

const InternationalDestinations = ({ onDestinationSelect }: InternationalDestinationsProps) => {
  const { t } = useI18n();

  return (
    <section id="destinos-internacionales" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Plane className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              {t("internationalDestinations.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            {t("internationalDestinations.titlePrefix")}{" "}
            <span className="text-gradient-sunset">{t("internationalDestinations.titleHighlight")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("internationalDestinations.descriptionLine1")}{" "}
            {t("internationalDestinations.descriptionLine2")}
          </p>
        </div>

        {/* Destinations grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              title={destination.title}
              location={t(destination.locationKey)}
              description={t(destination.descriptionKey)}
              image={destination.image}
              price={t(destination.priceKey)}
              duration={t(destination.durationKey)}
              onSelect={() => onDestinationSelect(destination.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternationalDestinations;
