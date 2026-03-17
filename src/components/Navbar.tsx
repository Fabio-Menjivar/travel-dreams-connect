import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plane, Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg gradient-ocean">
              <Plane className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display">
              <span className="text-gradient-ocean">Mundo</span>{" "}
              <span className="text-gradient-sunset">Travel</span>
            </span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("destinos-locales")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t("nav.local")}
            </button>
            <button
              onClick={() => scrollTo("destinos-internacionales")}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {t("nav.international")}
            </button>
            <Button
              onClick={() => scrollTo("contacto")}
              className="gradient-ocean text-primary-foreground hover:opacity-90"
            >
              {t("nav.contact")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={toggleLanguage}
              aria-label={t("nav.languageLabel")}
            >
              {language.toUpperCase()}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo("destinos-locales")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                {t("nav.local")}
              </button>
              <button
                onClick={() => scrollTo("destinos-internacionales")}
                className="text-left text-muted-foreground hover:text-primary transition-colors font-medium py-2"
              >
                {t("nav.international")}
              </button>
              <Button
                onClick={() => scrollTo("contacto")}
                className="gradient-ocean text-primary-foreground hover:opacity-90 w-full"
              >
                {t("nav.contact")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                aria-label={t("nav.languageLabel")}
              >
                {language.toUpperCase()}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
