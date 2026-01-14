import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceCard } from "@/components/voices/VoiceCard";

const previewVoices = [
  {
    name: "Marta",
    gender: "female" as const,
    description: "Топъл и приветлив глас, идеален за клиентска поддръжка и консултации.",
    audioSrc: "/voices/marta.mp3",
  },
  {
    name: "Georgi",
    gender: "male" as const,
    description: "Уверен и професионален глас, подходящ за корпоративна комуникация.",
    audioSrc: "/voices/georgi.mp3",
  },
];

export function VoicePreviewSection() {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Чуйте нашите{" "}
            <span className="text-gradient-gold">български гласове</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Изберете от 6 професионални български гласа за вашия AI агент. 
            Всеки глас е оптимизиран за естествено звучене при телефонни разговори.
          </p>
        </div>

        {/* Voice Cards Preview */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {previewVoices.map((voice) => (
            <VoiceCard
              key={voice.name}
              {...voice}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/voices">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold group">
              Виж всички гласове
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
