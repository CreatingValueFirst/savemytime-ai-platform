import { Clock, TrendingUp, Shield, Globe, Headphones, Zap } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Спестете 40+ часа месечно",
    description: "Автоматизирайте рутинните обаждания и оставете екипа си да се фокусира върху важните задачи.",
  },
  {
    icon: TrendingUp,
    title: "Увеличете конверсията с 40%",
    description: "Никога не пропускайте лийд - AI агентите отговарят мигновено, денонощно.",
  },
  {
    icon: Shield,
    title: "GDPR съвместимост",
    description: "Пълна защита на данните съгласно европейските регулации и ISO стандарти.",
  },
  {
    icon: Globe,
    title: "Многоезична поддръжка",
    description: "Обслужвайте клиенти на български, английски и други езици без допълнителни разходи.",
  },
  {
    icon: Headphones,
    title: "Професионални гласове",
    description: "Избор от 6 български гласа - мъжки и женски, с естествено звучене.",
  },
  {
    icon: Zap,
    title: "Мигновена интеграция",
    description: "Свързване с вашия CRM, календар и бизнес системи за минути.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Защо да изберете{" "}
            <span className="text-gradient-gold">Save My Time</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Нашите AI гласови агенти са проектирани да спестят време, 
            да увеличат продажбите и да подобрят клиентското преживяване.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group relative rounded-2xl p-8 bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow-gold-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
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
