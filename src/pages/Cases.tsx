import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Clock, 
  Phone, 
  Users, 
  Star,
  ArrowRight,
  Quote,
  Building2,
  ShoppingBag,
  Stethoscope,
  Home,
  Car,
  Briefcase
} from "lucide-react";

const caseStudies = [
  {
    icon: Stethoscope,
    industry: "Здравеопазване",
    company: "Медицински център 'Здраве'",
    challenge: "Пропускаха 40% от обажданията извън работно време, което водеше до загуба на пациенти и неефективно планиране на часове.",
    solution: "Внедрихме 24/7 AI гласов агент с женски глас 'Елена', който отговаря на обаждания, записва часове и изпраща напомняния.",
    results: [
      { metric: "0%", label: "Пропуснати обаждания" },
      { metric: "65%", label: "По-малко no-shows" },
      { metric: "120+", label: "Часа спестени месечно" },
      { metric: "35%", label: "Повече записани часове" }
    ],
    testimonial: "Вече не губим пациенти заради пропуснати обаждания. AI агентът работи перфектно и пациентите дори не разбират, че говорят с изкуствен интелект.",
    author: "Д-р Иванов",
    role: "Управител"
  },
  {
    icon: ShoppingBag,
    industry: "E-commerce",
    company: "Онлайн магазин 'Стил'",
    challenge: "Екипът за поддръжка беше претоварен с повтарящи се въпроси за доставка, размери и наличности. Клиентите чакаха с часове за отговор.",
    solution: "Интегрирахме AI чатбот, обучен на продуктовия каталог и политиките на магазина, с безпроблемно прехвърляне към жив агент.",
    results: [
      { metric: "80%", label: "Автоматични отговори" },
      { metric: "3 сек", label: "Среден отговор" },
      { metric: "45%", label: "Повече конверсии" },
      { metric: "€8,000", label: "Спестени месечно" }
    ],
    testimonial: "Конверсиите ни скочиха, защото клиентите получават отговори веднага. Екипът ни вече се фокусира само върху сложни случаи.",
    author: "Мария Петрова",
    role: "Директор продажби"
  },
  {
    icon: Home,
    industry: "Недвижими имоти",
    company: "Имоти Експрес",
    challenge: "Агентите губеха часове в квалифициране на лийдове по телефона. 70% от обажданията бяха от некачествени контакти.",
    solution: "AI гласов агент, който квалифицира лийдове, събира информация за бюджет и предпочитания, и насочва само горещите контакти.",
    results: [
      { metric: "70%", label: "По-качествени лийдове" },
      { metric: "50%", label: "По-бързо затваряне" },
      { metric: "200+", label: "Часа спестени месечно" },
      { metric: "3x", label: "Повече сделки" }
    ],
    testimonial: "Агентите ни вече работят само с мотивирани купувачи. Времето за затваряне на сделка падна наполовина.",
    author: "Георги Димитров",
    role: "Собственик"
  },
  {
    icon: Car,
    industry: "Автосервизи",
    company: "Авто Сервиз Про",
    challenge: "Механиците постоянно бяха прекъсвани от телефонни обаждания. Клиентите се оплакваха от дълго чакане и пропуснати напомняния.",
    solution: "AI телефонна система за записване на часове, автоматични напомняния и проследяване на статуса на ремонта.",
    results: [
      { metric: "95%", label: "Клиентска удовлетвореност" },
      { metric: "60%", label: "По-малко no-shows" },
      { metric: "40%", label: "Повече записани часове" },
      { metric: "€5,000", label: "Допълнителни приходи" }
    ],
    testimonial: "Механиците вече се фокусират върху ремонтите. Клиентите получават автоматични напомняния и актуализации за колите си.",
    author: "Петър Стоянов",
    role: "Управител"
  },
  {
    icon: Briefcase,
    industry: "Правни услуги",
    company: "Адвокатска кантора 'Правда'",
    challenge: "Адвокатите пропускаха обаждания по време на заседания. Потенциални клиенти търсеха конкуренти, когато не получаваха отговор.",
    solution: "AI рецепционист, който приема обаждания, записва информация за случаите и планира първоначални консултации.",
    results: [
      { metric: "100%", label: "Отговорени обаждания" },
      { metric: "55%", label: "Повече клиенти" },
      { metric: "80+", label: "Часа спестени месечно" },
      { metric: "4.9/5", label: "Рейтинг от клиенти" }
    ],
    testimonial: "Никога повече не пропускаме потенциален клиент. AI агентът е като перфектен секретар, който работи денонощно.",
    author: "Адв. Николова",
    role: "Партньор"
  },
  {
    icon: Building2,
    industry: "Хотелиерство",
    company: "Хотел Панорама",
    challenge: "Рецепцията беше претоварена с въпроси за резервации, удобства и местни атракции. Гостите чакаха на опашка.",
    solution: "Многоезичен AI консиерж за резервации, отговори на ЧЗВ и препоръки за местни забележителности.",
    results: [
      { metric: "24/7", label: "Обслужване на гости" },
      { metric: "70%", label: "По-малко натоварване" },
      { metric: "40%", label: "По-доволни гости" },
      { metric: "15%", label: "Повече upsells" }
    ],
    testimonial: "Гостите от цял свят получават отговори на родния си език. Рецепцията вече има време за персонално обслужване.",
    author: "Елена Маринова",
    role: "Генерален мениджър"
  }
];

const stats = [
  { value: "50+", label: "Успешни проекта" },
  { value: "1M+", label: "Автоматизирани разговори" },
  { value: "500K+", label: "Часа спестени" },
  { value: "98%", label: "Доволни клиенти" }
];

export default function Cases() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Реални резултати
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-gold">Кейсове</span> от клиенти
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Вижте как бизнеси като вашия постигат забележителни резултати с AI автоматизация.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {caseStudies.map((caseStudy, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 md:p-12"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Side - Info */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                        <caseStudy.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm text-primary font-medium">{caseStudy.industry}</span>
                        <h3 className="text-xl font-semibold">{caseStudy.company}</h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-red-400 mb-2">Предизвикателство:</h4>
                        <p className="text-muted-foreground">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Решение:</h4>
                        <p className="text-foreground">{caseStudy.solution}</p>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="relative bg-muted/30 rounded-xl p-6 mt-6">
                      <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                      <p className="text-muted-foreground italic pl-8">"{caseStudy.testimonial}"</p>
                      <div className="mt-4 flex items-center gap-3 pl-8">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{caseStudy.author}</div>
                          <div className="text-sm text-muted-foreground">{caseStudy.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Results */}
                  <div className="lg:w-80 space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Резултати:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {caseStudy.results.map((result, i) => (
                        <div key={i} className="bg-muted/30 rounded-xl p-4 text-center">
                          <div className="text-2xl font-display font-bold text-gradient-gold">
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-12 text-center max-w-4xl mx-auto glow-gold">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Готови ли сте да бъдете следващият успешен кейс?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Запазете безплатна консултация и открийте как AI може да трансформира вашия бизнес.
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
