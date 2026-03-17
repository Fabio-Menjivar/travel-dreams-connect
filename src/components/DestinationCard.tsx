import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

interface DestinationCardProps {
  title: string;
  location: string;
  description: string;
  image: string;
  price?: string;
  duration?: string;
  onSelect: () => void;
}

const DestinationCard = ({
  title,
  location,
  description,
  image,
  price,
  duration,
  onSelect,
}: DestinationCardProps) => {
  const { t } = useI18n();

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Location badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{location}</span>
        </div>

        {/* Price badge */}
        {price && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full gradient-sunset text-accent-foreground text-sm font-bold">
            {price}
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <h3 className="text-xl font-bold font-display mb-2 text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          {duration && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary hover:bg-primary/10 ml-auto group/btn"
            onClick={onSelect}
          >
            {t("destinationCard.seeMore")}
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
