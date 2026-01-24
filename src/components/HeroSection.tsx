import { Button } from "@/components/ui/button";
import { Plane, MapPin, Sun } from "lucide-react";

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection = ({ onContactClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 right-[15%] animate-float">
        <div className="p-4 rounded-2xl gradient-ocean shadow-lg">
          <Plane className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>
      <div className="absolute bottom-32 left-[10%] animate-float" style={{ animationDelay: "1s" }}>
        <div className="p-4 rounded-2xl gradient-sunset shadow-lg">
          <Sun className="w-8 h-8 text-accent-foreground" />
        </div>
      </div>
      <div className="absolute top-40 left-[20%] animate-float" style={{ animationDelay: "2s" }}>
        <div className="p-4 rounded-2xl gradient-tropical shadow-lg">
          <MapPin className="w-8 h-8 text-secondary-foreground" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Tu agencia de viajes en El Salvador
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
            <span className="text-gradient-ocean">Mundo</span>{" "}
            <span className="text-gradient-sunset">Travel</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre destinos increíbles desde El Salvador hacia el mundo. 
            Playas paradisíacas, aventuras y momentos inolvidables te esperan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gradient-ocean text-primary-foreground hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl shadow-lg"
              onClick={onContactClick}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Planifica tu viaje
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all text-lg px-8 py-6 rounded-xl"
              onClick={() => document.getElementById('destinos-locales')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Sun className="w-5 h-5 mr-2" />
              Explorar destinos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Viajes realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Destinos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Clientes felices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
