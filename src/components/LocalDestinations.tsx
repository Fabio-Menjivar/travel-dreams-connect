import DestinationCard from "./DestinationCard";
import { Palmtree, Waves, Mountain } from "lucide-react";

interface LocalDestinationsProps {
  onDestinationSelect: (destination: string) => void;
}

const destinations = [
  {
    id: "surf-city",
    title: "Surf City",
    location: "La Libertad",
    description: "Las mejores olas de Centroamérica te esperan. Playas de El Tunco, El Sunzal y Punta Roca para surfistas de todos los niveles.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80",
    price: "Desde $45",
    duration: "1-3 días",
    icon: Waves,
  },
  {
    id: "ruta-flores",
    title: "Ruta de las Flores",
    location: "Ahuachapán - Sonsonate",
    description: "Pueblos coloridos, café de altura, gastronomía típica y cascadas escondidas. Una experiencia cultural única en El Salvador.",
    image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=80",
    price: "Desde $55",
    duration: "1-2 días",
    icon: Palmtree,
  },
  {
    id: "volcanes",
    title: "Volcanes de El Salvador",
    location: "Santa Ana - San Salvador",
    description: "Conquista el volcán Santa Ana con su impresionante laguna de color turquesa, o explora el místico volcán de Izalco.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&auto=format&fit=crop&q=80",
    price: "Desde $35",
    duration: "1 día",
    icon: Mountain,
  },
];

const LocalDestinations = ({ onDestinationSelect }: LocalDestinationsProps) => {
  return (
    <section id="destinos-locales" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Palmtree className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Destinos locales</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Descubre{" "}
            <span className="text-gradient-tropical">El Salvador</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora las maravillas naturales y culturales de nuestro hermoso país. 
            Playas de clase mundial, montañas imponentes y pueblos llenos de historia.
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

export default LocalDestinations;
