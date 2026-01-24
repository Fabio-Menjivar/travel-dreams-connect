import { Plane, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg gradient-ocean">
                <Plane className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-display">Mundo Travel</span>
            </div>
            <p className="text-background/70 mb-6 max-w-md">
              Tu agencia de viajes en El Salvador. Desde 2015 haciendo realidad los sueños de viaje de miles de salvadoreños.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Destinos populares</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#destinos-locales" className="hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Surf City
                </a>
              </li>
              <li>
                <a href="#destinos-locales" className="hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ruta de las Flores
                </a>
              </li>
              <li>
                <a href="#destinos-internacionales" className="hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Roatán
                </a>
              </li>
              <li>
                <a href="#destinos-internacionales" className="hover:text-primary transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Disney World
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +503 2222-3333
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@mundotravel.sv
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span>Col. Escalón, San Salvador, El Salvador</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Mundo Travel. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-primary transition-colors">
              Términos y condiciones
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
