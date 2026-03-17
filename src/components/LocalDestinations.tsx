import DestinationCard from "./DestinationCard";
import { Palmtree, Waves, Mountain } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

interface LocalDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

const destinations = [
  {
    id: "surf-city",
    title: "Surf City",
    locationKey: "localDestinations.surfCity.location",
    descriptionKey: "localDestinations.surfCity.description",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
    priceKey: "localDestinations.surfCity.price",
    durationKey: "localDestinations.surfCity.duration",
    icon: Waves,
  },
  {
    id: "ruta-flores",
    title: "Ruta de las Flores",
    locationKey: "localDestinations.rutaFlores.location",
    descriptionKey: "localDestinations.rutaFlores.description",
    image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=80",
    priceKey: "localDestinations.rutaFlores.price",
    durationKey: "localDestinations.rutaFlores.duration",
    icon: Palmtree,
  },
  {
    id: "volcanes",
    title: "Volcanes de El Salvador",
    locationKey: "localDestinations.volcanes.location",
    descriptionKey: "localDestinations.volcanes.description",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&auto=format&fit=crop&q=80",
    priceKey: "localDestinations.volcanes.price",
    durationKey: "localDestinations.volcanes.duration",
    icon: Mountain,
  },
];

const LocalDestinations = ({ onDestinationSelect }: LocalDestinationsProps) => {
  const { t } = useI18n();

  return (
    <section id="destinos-locales" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Palmtree className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              {t("localDestinations.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            {t("localDestinations.titlePrefix")}{" "}
            <span className="text-gradient-tropical">El Salvador</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("localDestinations.descriptionLine1")}{" "}
            {t("localDestinations.descriptionLine2")}
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

export default LocalDestinations;
