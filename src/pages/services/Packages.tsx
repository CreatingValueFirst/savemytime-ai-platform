import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Phone,
  Target,
  Zap,
  Star,
} from "lucide-react";

const packages = [
  {
    id: "24-7-inquiries",
    name: "Запитвания 24/7",
    badge: null,
    description: "Не губете клиенти извън работно време",
    targetAudience: "За бизнеси с много онлайн запитвания, които искат да отговарят мигновено, денонощно.",
    problem: "Клиентите пишат в 22:00 или в събота, а отговор получават в понеделник. До тогава са отишли при конкурента.",
    includes: [
      "AI чатбот за клиентска поддръжка",
      "CRM интеграция за автоматично записване на лийдове",
      "Интеграция с календар за резервации",
      "Брандиране според вашата идентичност",
      "Табло с анализи в реално време",
    ],
    icon: Clock,
  },
  {
    id: "zero-missed-calls",
    name: "Нула пропуснати обаждания",
    badge: "Популярен",
    description: "Отговаряйте на всяко обаждане, винаги",
    targetAudience: "За бизнеси с много телефонни обаждания – клиники, сервизи, адвокатски кантори, хотели.",
    problem: "Всяко пропуснато обаждане може да е загубен клиент. А ние пропускаме обаждания всеки ден.",
    includes: [
      "AI гласов агент за обработка на обаждания",
      "Известия в реално време при важни обаждания",
      "CRM интеграция за автоматично логване",
      "Записи и транскрипти на разговорите",
      "Автоматично насрочване в календара",
    ],
    icon: Phone,
  },
  {
    id: "sales-pipeline",
    name: "Pipeline за продажби",
    badge: null,
    description: "Пълнете pipeline-а си без ръчно търсене",
    targetAudience: "За B2B компании, които искат повече квалифицирани лийдове без да наемат нови търговци.",
    problem: "Търговците прекарват 80% от времето в търсене на контакти вместо в разговори с клиенти.",
    includes: [
      "AI система за генериране на лийдове",
      "CRM интеграция за директно подаване на контакти",
      "Персонализирани email последователности",
      "A/B тестване и оптимизация",
      "Месечен отчет с анализ на резултатите",
    ],
    icon: Target,
  },
  {
    id: "full-automation",
    name: "Пълна автоматизация",
    badge: "Всичко включено",
    description: "Цялостно AI решение за вашия бизнес",
    targetAudience: "За компании, които искат цялостна трансформация на клиентското обслужване и продажбите.",
    problem: "Имаме нужда от автоматизация на много фронтове, но не знаем откъде да започнем.",
    includes: [
      "24/7 клиентска поддръжка с AI чатбот",
      "Гласов агент за обработка на обаждания",
      "Система за генериране на лийдове",
      "Вътрешен AI асистент за екипа",
      "Пълна интеграция с вашите системи",
      "Приоритетна поддръжка и оптимизация",
    ],
    icon: Zap,
  },
];

export default function Packages() {
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
            <span className="text-foreground">Пакети</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-16 pt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gradient-gold">
              Комбинирани пакети
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Готови решения за най-честите бизнес нужди. Избери пакет и стартирай бързо.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className="glass rounded-2xl p-8 relative hover:glow-gold-sm transition-all duration-300 flex flex-col"
                >
                  {pkg.badge && (
                    <div className="absolute -top-3 right-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        <Star className="w-3 h-3" />
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center glow-gold-sm">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground">
                        {pkg.name}
                      </h3>
                      <p className="text-primary font-medium">{pkg.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">За кого:</span> {pkg.targetAudience}
                    </p>
                  </div>

                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-red-400">Проблемът:</span> {pkg.problem}
                    </p>
                  </div>

                  <div className="mb-8 flex-grow">
                    <p className="text-sm font-medium text-foreground mb-3">Какво включва:</p>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/contact">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Заявете оферта
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-gradient-gold">
              Нужно ви е нещо различно?
            </h2>
            <p className="text-muted-foreground mb-8">
              Ако нито един пакет не отговаря на нуждите ви, можем да създадем персонализирано решение.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services/custom-ai">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Виж персонализирани решения
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                  Безплатна консултация
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
