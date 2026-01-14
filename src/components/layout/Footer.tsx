import { Link } from "react-router-dom";
import { Headphones, Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { href: "/services#support", label: "24/7 Поддръжка" },
    { href: "/services#calls", label: "Обработка на обаждания" },
    { href: "/services#leads", label: "Генериране на лийдове" },
    { href: "/services#geo", label: "GEO оптимизация" },
    { href: "/services#custom", label: "Персонализиран AI" },
  ],
  company: [
    { href: "/cases", label: "Кейсове" },
    { href: "/pricing", label: "Цени" },
    { href: "/contact", label: "Контакт" },
    { href: "/auth", label: "Клиентски портал" },
  ],
  legal: [
    { href: "/privacy", label: "Поверителност" },
    { href: "/terms", label: "Условия за ползване" },
    { href: "/gdpr", label: "GDPR" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo.jpg"
                alt="Save My Time Logo"
                className="h-16 w-auto object-contain transition-all duration-300 hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Професионални български гласови AI агенти за виртуални рецепционисти.
              Спестете време и увеличете продажбите с 24/7 автоматизация.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Контакти</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@savemytime.dev" className="hover:text-primary transition-colors">
                  info@savemytime.dev
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+359888123456" className="hover:text-primary transition-colors">
                  +359 888 123 456
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>София, България</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Save My Time. Всички права запазени.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
