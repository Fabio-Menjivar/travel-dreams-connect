import DestinationCard from "./DestinationCard";
import { Globe, Plane, Castle, Sparkles } from "lucide-react";

interface InternationalDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

const destinations = [
  {
    id: "europa",
    title: "Europa Mágica",
    location: "España, Italia, Francia",
    description: "Recorre las ciudades más emblemáticas de Europa. Barcelona, Roma, París y más destinos te esperan con su historia y cultura.",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    price: "Desde $1,899",
    duration: "10-15 días",
    icon: Castle,
  },
  {
    id: "roatan",
    title: "Roatán Paradise",
    location: "Honduras",
    description: "Aguas cristalinas del Caribe, el segundo arrecife de coral más grande del mundo y playas de ensueño a pocas horas de vuelo.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    price: "Desde $450",
    duration: "4-7 días",
    icon: Globe,
  },
  {
    id: "disney",
    title: "Disney World",
    location: "Orlando, Florida",
    description: "El lugar más mágico del mundo. Vive la experiencia Disney con tu familia en los parques temáticos más famosos del planeta.",
    image: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800&auto=format&fit=crop&q=80",
    price: "Desde $1,299",
    duration: "5-8 días",
    icon: Sparkles,
  },
];

const InternationalDestinations = ({ onDestinationSelect }: InternationalDestinationsProps) => {
  return (
    <section id="destinos-internacionales" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Plane className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Destinos internacionales</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Mundo Travel{" "}
            <span className="text-gradient-sunset">sin fronteras</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cruza fronteras y vive experiencias únicas alrededor del mundo. 
            Desde el Caribe hasta Europa, hacemos tu sueño de viajar realidad.
          </p>
        </div>

        {/* Destinations grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              title={destination.title}
              location={destination.location}
              description={destination.description}
              image={destination.image}
              price={destination.price}
              duration={destination.duration}
              onSelect={() => onDestinationSelect(destination.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternationalDestinations;
