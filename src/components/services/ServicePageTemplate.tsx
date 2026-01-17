import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Shield,
  Clock,
  Users,
  TrendingUp,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

interface ServicePageProps {
  title: string;
  subtitle: string;
  targetAudience: {
    industries: string[];
    situations: string[];
  };
  problem: string[];
  solution: string[];
  deliverables: string[];
  steps: {
    title: string;
    description: string;
  }[];
  expectedResults: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export function ServicePageTemplate({
  title,
  subtitle,
  targetAudience,
  problem,
  solution,
  deliverables,
  steps,
  expectedResults,
  faqs,
}: ServicePageProps) {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="pt-24 pb-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/services" className="hover:text-primary transition-colors">
              Услуги
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-16 pt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 sm:mb-6 text-gradient-gold leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                  Безплатна консултация
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/services/packages">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Виж пакетите
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            За кого е тази услуга
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Подходящо за
              </h3>
              <ul className="space-y-3">
                {targetAudience.industries.map((industry, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Кога има смисъл
              </h3>
              <ul className="space-y-3">
                {targetAudience.situations.map((situation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{situation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Проблем → Решение
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6 border-l-4 border-red-500/50">
              <h3 className="text-lg font-semibold text-red-400 mb-4">Проблемът</h3>
              <ul className="space-y-4">
                {problem.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6 border-l-4 border-primary/50">
              <h3 className="text-lg font-semibold text-primary mb-4">Нашето решение</h3>
              <ul className="space-y-4">
                {solution.map((item, index) => (
                  <li key={index} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Какво точно получавате
          </h2>
          <div className="glass rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Как работи
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="glass rounded-2xl p-6 flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-gold-sm">
                  <span className="text-primary font-bold text-lg">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Results */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Очакван ефект
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expectedResults.map((result, index) => {
              const Icon = result.icon;
              return (
                <div key={index} className="glass rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 glow-gold-sm">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
                  <p className="text-muted-foreground text-sm">{result.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Visibility */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative group/visibility">
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-3xl blur-2xl opacity-30 group-hover/visibility:opacity-50 transition-opacity duration-700" />

            <div className="glass rounded-3xl p-8 sm:p-10 md:p-12 max-w-5xl mx-auto relative hover:glow-gold-sm transition-all duration-500">
              {/* Icon and Title */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-6 group-hover/visibility:scale-110 group-hover/visibility:rotate-3 transition-all duration-500">
                  <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover/visibility:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 text-gradient-gold">
                  {t('services.aiVisibilityTitle')}
                </h2>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('services.aiVisibilityDesc')}
              </p>

              {/* Key Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{t('services.aiFeature1Title')}</h4>
                    <p className="text-xs text-muted-foreground">{t('services.aiFeature1Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{t('services.aiFeature2Title')}</h4>
                    <p className="text-xs text-muted-foreground">{t('services.aiFeature2Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{t('services.aiFeature3Title')}</h4>
                    <p className="text-xs text-muted-foreground">{t('services.aiFeature3Desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{t('services.aiFeature4Title')}</h4>
                    <p className="text-xs text-muted-foreground">{t('services.aiFeature4Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Сигурност и съответствие
          </h2>
          <div className="glass rounded-2xl p-8">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">GDPR съответствие</h3>
                  <p className="text-sm text-muted-foreground">
                    Пълно съответствие с европейските регулации за защита на данните.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Контрол на достъпа</h3>
                  <p className="text-sm text-muted-foreground">
                    Роли и права за всеки член на екипа ви.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Вашите данни</h3>
                  <p className="text-sm text-muted-foreground">
                    Данните остават под пълния контрол на вашата организация.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-6 sm:mb-8 text-gradient-gold">
            Често задавани въпроси
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="glass rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-medium hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-12 text-center max-w-3xl mx-auto glow-gold-sm">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-3 sm:mb-4 text-gradient-gold leading-tight px-2">
              Искате ли да видите дали това е подходящо за вашия бизнес?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
              Резервирайте безплатна 30-минутна консултация и ще ви покажем как можем да помогнем.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                Безплатна консултация
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
