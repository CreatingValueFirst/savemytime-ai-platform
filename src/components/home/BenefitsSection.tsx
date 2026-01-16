import { Clock, TrendingUp, Shield, Globe, Headphones, Zap } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    titleKey: "benefit1Title",
    descKey: "benefit1Desc",
  },
  {
    icon: TrendingUp,
    titleKey: "benefit2Title",
    descKey: "benefit2Desc",
  },
  {
    icon: Shield,
    titleKey: "benefit3Title",
    descKey: "benefit3Desc",
  },
  {
    icon: Globe,
    titleKey: "benefit4Title",
    descKey: "benefit4Desc",
  },
  {
    icon: Headphones,
    titleKey: "benefit5Title",
    descKey: "benefit5Desc",
  },
  {
    icon: Zap,
    titleKey: "benefit6Title",
    descKey: "benefit6Desc",
  },
];

import { useTranslation } from "react-i18next";

export function BenefitsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('benefits.heading')}{" "}
            <span className="text-gradient-gold">{t('benefits.headingBrand')}</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('benefits.subheading')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.titleKey}
              className="group relative rounded-2xl p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow-gold-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-3">
                {t(`benefits.${benefit.titleKey}`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(`benefits.${benefit.descKey}`)}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
