import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Phone,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Calculator() {
  const [monthlyCallsReceived, setMonthlyCallsReceived] = useState(500);
  const [missedCallsPercent, setMissedCallsPercent] = useState(30);
  const [avgDealValue, setAvgDealValue] = useState(500);
  const [conversionRate, setConversionRate] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(15);
  const [hoursOnCalls, setHoursOnCalls] = useState(40);

  // Calculations
  const missedCalls = Math.round(monthlyCallsReceived * (missedCallsPercent / 100));
  const potentialLeadsLost = Math.round(missedCalls * (conversionRate / 100));
  const revenueLostMonthly = potentialLeadsLost * avgDealValue;
  const revenueLostYearly = revenueLostMonthly * 12;

  const laborCostMonthly = hoursOnCalls * hourlyWage * 4; // 4 weeks
  const aiCostMonthly = 299; // Примерна цена
  const laborSavingsMonthly = laborCostMonthly * 0.7; // AI handles 70%
  
  const totalSavingsMonthly = revenueLostMonthly + laborSavingsMonthly - aiCostMonthly;
  const totalSavingsYearly = totalSavingsMonthly * 12;
  const roi = Math.round((totalSavingsYearly / (aiCostMonthly * 12)) * 100);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CalcIcon className="w-4 h-4 inline mr-2" />
              ROI Калкулатор
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Колко <span className="text-gradient-gold">губите</span> всеки месец?
            </h1>
            <p className="text-xl text-muted-foreground">
              Изчислете реалната цена на пропуснатите обаждания и ръчната работа. Вижте какво можете да спестите с AI автоматизация.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Input Panel */}
            <div className="glass rounded-3xl p-8 space-y-8">
              <h2 className="text-2xl font-display font-semibold flex items-center gap-3">
                <Phone className="w-6 h-6 text-primary" />
                Вашите данни
              </h2>

              <div className="space-y-6">
                {/* Monthly Calls */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Обаждания месечно</Label>
                    <span className="text-primary font-semibold">{monthlyCallsReceived}</span>
                  </div>
                  <Slider
                    value={[monthlyCallsReceived]}
                    onValueChange={(v) => setMonthlyCallsReceived(v[0])}
                    min={50}
                    max={5000}
                    step={50}
                    className="py-2"
                  />
                </div>

                {/* Missed Calls Percent */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Пропуснати обаждания (%)</Label>
                    <span className="text-primary font-semibold">{missedCallsPercent}%</span>
                  </div>
                  <Slider
                    value={[missedCallsPercent]}
                    onValueChange={(v) => setMissedCallsPercent(v[0])}
                    min={5}
                    max={70}
                    step={5}
                    className="py-2"
                  />
                </div>

                {/* Average Deal Value */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Средна стойност на сделка (лв.)</Label>
                    <span className="text-primary font-semibold">{avgDealValue} лв.</span>
                  </div>
                  <Slider
                    value={[avgDealValue]}
                    onValueChange={(v) => setAvgDealValue(v[0])}
                    min={50}
                    max={10000}
                    step={50}
                    className="py-2"
                  />
                </div>

                {/* Conversion Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Конверсия от обаждане към продажба (%)</Label>
                    <span className="text-primary font-semibold">{conversionRate}%</span>
                  </div>
                  <Slider
                    value={[conversionRate]}
                    onValueChange={(v) => setConversionRate(v[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="py-2"
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Разходи за персонал
                  </h3>
                </div>

                {/* Hourly Wage */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Часова ставка (лв.)</Label>
                    <span className="text-primary font-semibold">{hourlyWage} лв.</span>
                  </div>
                  <Slider
                    value={[hourlyWage]}
                    onValueChange={(v) => setHourlyWage(v[0])}
                    min={5}
                    max={50}
                    step={1}
                    className="py-2"
                  />
                </div>

                {/* Hours on Calls */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Часове седмично за обаждания</Label>
                    <span className="text-primary font-semibold">{hoursOnCalls} часа</span>
                  </div>
                  <Slider
                    value={[hoursOnCalls]}
                    onValueChange={(v) => setHoursOnCalls(v[0])}
                    min={5}
                    max={160}
                    step={5}
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Current Losses */}
              <div className="glass rounded-3xl p-8 border-l-4 border-red-500/50">
                <h2 className="text-2xl font-display font-semibold mb-6 text-red-400">
                  Текущи загуби
                </h2>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Пропуснати обаждания месечно</span>
                    <span className="text-xl font-semibold text-red-400">{missedCalls}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Загубени потенциални клиенти</span>
                    <span className="text-xl font-semibold text-red-400">{potentialLeadsLost}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Загубени приходи месечно</span>
                    <span className="text-xl font-semibold text-red-400">{revenueLostMonthly.toLocaleString()} лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Загубени приходи годишно</span>
                    <span className="text-2xl font-bold text-red-400">{revenueLostYearly.toLocaleString()} лв.</span>
                  </div>
                </div>
              </div>

              {/* With AI */}
              <div className="glass rounded-3xl p-8 border-l-4 border-primary/50 glow-gold">
                <h2 className="text-2xl font-display font-semibold mb-6 text-gradient-gold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  С AI автоматизация
                </h2>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Спестени от възстановени обаждания</span>
                    <span className="text-xl font-semibold text-primary">+{revenueLostMonthly.toLocaleString()} лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Спестени от персонал (70%)</span>
                    <span className="text-xl font-semibold text-primary">+{Math.round(laborSavingsMonthly).toLocaleString()} лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Цена на AI решение</span>
                    <span className="text-xl font-semibold text-muted-foreground">-{aiCostMonthly} лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50 bg-primary/10 rounded-lg px-4 -mx-4">
                    <span className="font-semibold">Нетна полза месечно</span>
                    <span className="text-2xl font-bold text-primary">+{Math.round(totalSavingsMonthly).toLocaleString()} лв.</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-semibold">Нетна полза годишно</span>
                    <span className="text-3xl font-bold text-gradient-gold">+{Math.round(totalSavingsYearly).toLocaleString()} лв.</span>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-primary/10 rounded-2xl text-center">
                  <div className="text-sm text-muted-foreground mb-2">Възвръщаемост на инвестицията (ROI)</div>
                  <div className="text-5xl font-display font-bold text-gradient-gold">{roi}%</div>
                </div>
              </div>

              <Link to="/contact" className="block">
                <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                  Получете персонализирана оценка
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            * Изчисленията са приблизителни и базирани на въведените от вас данни. Реалните резултати могат да варират в зависимост от спецификата на бизнеса. Свържете се с нас за точна оценка.
          </p>
        </div>
      </section>
    </Layout>
  );
}
