import { Link } from "react-router-dom";
import { Headphones, Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

const footerLinks = {
  services: [
    { href: "/services#support", key: "service1" },
    { href: "/services#calls", key: "service2" },
    { href: "/services#leads", key: "service3" },
    { href: "/services#geo", key: "service4" },
    { href: "/services#custom", key: "service5" },
    { href: "/services#apps", key: "service6" },
  ],
  company: [
    { href: "/cases", key: "cases" },
    { href: "/pricing", key: "pricing" },
    { href: "/contact", key: "contact" },
    { href: "/auth", key: "portal" },
  ],
  legal: [
    { href: "/privacy", key: "privacy" },
    { href: "/terms", key: "terms" },
    { href: "/gdpr", key: "gdpr" },
  ],
};

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full bg-green-vivid/40 rounded-full"></div>
                </div>

                {/* Logo */}
                <div className="relative flex items-center gap-3">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-green-vivid to-green-dark glow-green-sm neon-border group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white animate-pulse">⚡</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-display font-bold text-gradient-green leading-tight tracking-tight">
                      SaveMyTime
                    </span>
                    <span className="text-xs font-semibold text-green-light/70 tracking-widest uppercase">
                      AI Automation Platform
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
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
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.companyTitle')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">{t('footer.contactTitle')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@savemytime.dev" className="hover:text-primary transition-colors">
                  {t('footer.email')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+359888123456" className="hover:text-primary transition-colors">
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{t('footer.location')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(`footer.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
