import { Link } from "react-router-dom";
import { ArrowRight, Play, Headphones, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {t('hero.badge')}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-gradient-gold">{t('hero.title')}</span>
              <br />
              <span className="text-foreground">{t('hero.titleSecond')}</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/voices">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold group">
                  <Headphones className="w-5 h-5 mr-2" />
                  {t('hero.listenVoices')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 group">
                  <Play className="w-5 h-5 mr-2" />
                  {t('hero.freeConsultation')}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-display font-bold text-gradient-gold">40+</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat1')}</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-gradient-gold">24/7</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat2')}</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-gradient-gold">70%</div>
                <div className="text-sm text-muted-foreground">{t('hero.stat3')}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main Card */}
              <div className="glass rounded-3xl p-8 glow-gold">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center glow-gold-sm">
                    <Headphones className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold">{t('hero.aiReceptionist')}</h3>
                    <p className="text-muted-foreground text-sm">{t('hero.active247')}</p>
                  </div>
                  <div className="ml-auto w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Sound Wave Animation */}
                <div className="flex items-center justify-center gap-1 h-20 mb-6">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${20 + Math.random() * 40}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.5 + Math.random() * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                <p className="text-center text-muted-foreground italic">
                  "{t('hero.greeting')}"
                </p>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-8 -right-8 glass rounded-2xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">+40%</div>
                    <div className="text-xs text-muted-foreground">{t('hero.conversion')}</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">0.3 {t('hero.responseTime') === 'response time' ? 'sec' : 'сек'}</div>
                    <div className="text-xs text-muted-foreground">{t('hero.responseTime')}</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-12 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">1000+</div>
                    <div className="text-xs text-muted-foreground">{t('hero.callsPerMonth')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
