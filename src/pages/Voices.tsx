import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { VoiceCard } from "@/components/voices/VoiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";

const voices = [
  { name: "Alexandra", gender: "female" as const, description: "Елегантен и изтънчен глас, перфектен за луксозни марки и VIP обслужване.", audioSrc: "/voices/alexandra.mp3" },
  { name: "Elena", gender: "female" as const, description: "Енергичен и позитивен глас, подходящ за продажби и маркетинг кампании.", audioSrc: "/voices/elena.mp3" },
  { name: "Marta", gender: "female" as const, description: "Топъл и приветлив глас, идеален за клиентска поддръжка и консултации.", audioSrc: "/voices/marta.mp3" },
  { name: "Milena", gender: "female" as const, description: "Спокоен и успокояващ глас, подходящ за здравни и wellness услуги.", audioSrc: "/voices/milena.mp3" },
  { name: "Georgi", gender: "male" as const, description: "Уверен и професионален глас, подходящ за корпоративна комуникация.", audioSrc: "/voices/georgi.mp3" },
  { name: "Peter-K", gender: "male" as const, description: "Авторитетен и надежден глас, идеален за финансови и правни услуги.", audioSrc: "/voices/peter-k.mp3" },
];

export default function Voices() {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", customText: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVoice) {
      toast({ title: "Моля, изберете глас", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: leadError } = await supabase.from("leads").insert({
        name: formData.name, email: formData.email, phone: formData.phone,
        company: formData.company, source: "voice_demo", interest: selectedVoice,
      });
      if (leadError) throw leadError;

      await supabase.from("voice_selections").insert({
        voice_name: selectedVoice,
        voice_gender: voices.find(v => v.name === selectedVoice)?.gender,
        custom_text: formData.customText,
      });

      toast({ title: "Успешно!", description: "Ще се свържем с вас за персонализирано демо." });
      setFormData({ name: "", email: "", phone: "", company: "", customText: "" });
      setSelectedVoice(null);
    } catch {
      toast({ title: "Грешка", description: "Моля, опитайте отново.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Изберете <span className="text-gradient-gold">глас</span> за вашия агент
            </h1>
            <p className="text-xl text-muted-foreground">
              Слушайте и изберете перфектния български глас за вашия AI виртуален рецепционист.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {voices.map((voice) => (
              <VoiceCard
                key={voice.name}
                {...voice}
                isSelected={selectedVoice === voice.name}
                onSelect={() => setSelectedVoice(voice.name)}
              />
            ))}
          </div>

          {selectedVoice && (
            <div className="max-w-2xl mx-auto glass rounded-2xl p-8 glow-gold animate-fade-in">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                Заявете демо с <span className="text-gradient-gold">{selectedVoice}</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label>Име *</Label><Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div><Label>Имейл *</Label><Input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
                  <div><Label>Телефон</Label><Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
                  <div><Label>Компания</Label><Input value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} /></div>
                </div>
                <div><Label>Текст за демо (по избор)</Label><Textarea placeholder="Въведете текст, който искате да бъде изговорен..." value={formData.customText} onChange={(e) => setFormData({...formData, customText: e.target.value})} /></div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground glow-gold" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />{isSubmitting ? "Изпращане..." : "Заявете персонализирано демо"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
