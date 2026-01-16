import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Zap,
  Phone,
  Target,
  Globe,
  Code,
  Package,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const services = [
  {
    id: "customer-support",
    icon: Headphones,
    serviceKey: "service1",
    href: "/services/customer-support",
  },
  {
    id: "internal-operations",
    icon: Zap,
    serviceKey: "service2",
    href: "/services/internal-operations",
  },
  {
    id: "voice-agent",
    icon: Phone,
    serviceKey: "service3",
    href: "/services/voice-agent",
  },
  {
    id: "lead-generation",
    icon: Target,
    serviceKey: "service4",
    href: "/services/lead-generation",
  },
  {
    id: "geo",
    icon: Globe,
    serviceKey: "service5",
    href: "/services/geo",
  },
  {
    id: "custom-ai",
    icon: Code,
    serviceKey: "service6",
    href: "/services/custom-ai",
  },
  {
    id: "custom-apps",
    icon: Smartphone,
    serviceKey: "service7",
    href: "/services/custom-apps",
  },
];

export default function ServicesIndex() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center px-2">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient-gold">{t('services.heading')}</span>
              <br />
              {t('services.headingSecond')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              {t('services.subheading')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="glass rounded-2xl p-6 hover:glow-gold-sm transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-foreground leading-tight">
                      {t(`services.${service.serviceKey}.title`)}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm">
                    <span className="text-primary font-medium">{t('services.whatItSolves')}</span> {t(`services.${service.serviceKey}.solves`)}
                  </p>

                  <div className="mb-6 flex-grow">
                    <p className="text-sm font-medium text-foreground mb-2">{t('services.whatYouGet')}</p>
                    <ul className="space-y-2">
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {t(`services.${service.serviceKey}.benefit1`)}
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {t(`services.${service.serviceKey}.benefit2`)}
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {t(`services.${service.serviceKey}.benefit3`)}
                      </li>
                    </ul>
                  </div>

                  <Link to={service.href}>
                    <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                      {t('services.viewDetails')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto glow-gold-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-3 sm:mb-4 text-gradient-gold leading-tight px-2">
              {t('services.notSure')}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
              {t('services.notSureDesc')}
            </p>
            <Link to="/services/packages">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('services.viewPackages')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
