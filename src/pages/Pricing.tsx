import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Check, 
  X, 
  Sparkles,
  ArrowRight,
  Phone,
  MessageSquare,
  Headphones,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "За малки бизнеси, които искат да започнат с AI",
    price: "299",
    period: "месечно",
    popular: false,
    icon: MessageSquare,
    features: [
      { text: "До 500 разговора месечно", included: true },
      { text: "1 AI агент", included: true },
      { text: "Чат интеграция", included: true },
      { text: "Основни анализи", included: true },
      { text: "Email поддръжка", included: true },
      { text: "Телефонни обаждания", included: false },
      { text: "CRM интеграция", included: false },
      { text: "Персонализирано обучение", included: false },
      { text: "Приоритетна поддръжка", included: false },
    ],
    cta: "Започнете безплатно",
    ctaVariant: "outline" as const
  },
  {
    name: "Professional",
    description: "Най-популярен избор за растящи компании",
    price: "599",
    period: "месечно",
    popular: true,
    icon: Headphones,
    features: [
      { text: "До 2,000 разговора месечно", included: true },
      { text: "3 AI агента", included: true },
      { text: "Чат + Телефон интеграция", included: true },
      { text: "Разширени анализи", included: true },
      { text: "CRM интеграция", included: true },
      { text: "Календарна интеграция", included: true },
      { text: "Приоритетна поддръжка", included: true },
      { text: "Персонализирано обучение", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    cta: "Най-популярен избор",
    ctaVariant: "default" as const
  },
  {
    name: "Enterprise",
    description: "За големи компании с комплексни нужди",
    price: "По договаряне",
    period: "",
    popular: false,
    icon: Zap,
    features: [
      { text: "Неограничени разговори", included: true },
      { text: "Неограничени AI агенти", included: true },
      { text: "Всички интеграции", included: true },
      { text: "Custom AI модели", included: true },
      { text: "On-premise опция", included: true },
      { text: "Персонализирано обучение", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA гаранция 99.9%", included: true },
      { text: "Пълна GDPR/HIPAA съвместимост", included: true },
    ],
    cta: "Свържете се с нас",
    ctaVariant: "outline" as const
  }
];

const addons = [
  {
    name: "Допълнителен AI агент",
    price: "99 лв./месец",
    description: "Добавете още един специализиран агент"
  },
  {
    name: "Допълнителни 1,000 разговора",
    price: "149 лв.",
    description: "Пакет с допълнителни разговори"
  },
  {
    name: "Персонализиран глас",
    price: "299 лв. еднократно",
    description: "Уникален глас за вашия бранд"
  },
  {
    name: "CRM интеграция",
    price: "199 лв./месец",
    description: "Свържете се с HubSpot, Salesforce и др."
  }
];

const faqs = [
  {
    question: "Какво е включено в 'разговор'?",
    answer: "Един разговор е пълна сесия с клиент, независимо от продължителността. Може да бъде телефонно обаждане или чат разговор."
  },
  {
    question: "Мога ли да сменя плана си?",
    answer: "Да, можете да надградите или понижите плана си по всяко време. Промените влизат в сила от следващия платежен цикъл."
  },
  {
    question: "Има ли договор за обвързване?",
    answer: "Не, всички планове са на месечна база и можете да откажете по всяко време без неустойки."
  },
  {
    question: "Как се таксуват допълнителните разговори?",
    answer: "Ако надхвърлите лимита на плана си, ще бъдете таксувани автоматично по 0.15 лв. на допълнителен разговор."
  },
  {
    question: "Предлагате ли пробен период?",
    answer: "Да, предлагаме 14-дневен безплатен пробен период за плановете Starter и Professional."
  }
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Прозрачни цени
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Изберете <span className="text-gradient-gold">плана за вас</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Без скрити такси. Без дългосрочни договори. Започнете безплатно.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "glass rounded-3xl p-8 relative flex flex-col",
                  plan.popular && "ring-2 ring-primary glow-gold scale-105 z-10"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Най-популярен
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-gradient-gold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2">лв./{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground/50"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button
                    className={cn(
                      "w-full",
                      plan.popular && "bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm"
                    )}
                    variant={plan.ctaVariant}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Допълнителни услуги</h2>
            <p className="text-muted-foreground">Персонализирайте плана си според нуждите</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-2">{addon.name}</h3>
                <div className="text-primary font-bold mb-2">{addon.price}</div>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Често задавани въпроси
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto glow-gold">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Не сте сигурни кой план е за вас?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Нашият екип ще ви помогне да изберете най-доброто решение за вашия бизнес.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                <Phone className="mr-2 w-5 h-5" />
                Безплатна консултация
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
