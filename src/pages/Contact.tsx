import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Calendar,
  MessageSquare,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа").max(100, "Името е твърде дълго"),
  email: z.string().email("Невалиден email адрес"),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Невалиден телефонен номер")
    .min(10, "Телефонът трябва да е поне 10 цифри")
    .optional()
    .or(z.literal("")),
  company: z.string().max(100, "Името на компанията е твърде дълго").optional(),
  message: z.string()
    .min(10, "Съобщението трябва да е поне 10 символа")
    .max(1000, "Съобщението е твърде дълго")
    .optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Save as lead
      const { error: leadError } = await supabase.from("leads").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        notes: data.message || null,
        source: "contact_form",
        interest: "general"
      });

      if (leadError) throw leadError;

      // Also save as consultation request
      const { error: consultError } = await supabase.from("consultations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message || null
      });

      if (consultError) throw consultError;

      toast({
        title: "Заявката е изпратена!",
        description: "Ще се свържем с вас в рамките на 24 часа.",
      });

      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Грешка",
        description: "Моля, опитайте отново или ни се обадете директно.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+359 888 123 456",
      href: "tel:+359888123456"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@savemytime.dev",
      href: "mailto:info@savemytime.dev"
    },
    {
      icon: MapPin,
      label: "Адрес",
      value: "София, България",
      href: null
    },
    {
      icon: Clock,
      label: "Работно време",
      value: "Пон-Пет: 9:00 - 18:00",
      href: null
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Свържете се с нас
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="text-gradient-gold">Безплатна</span> консултация
            </h1>
            <p className="text-xl text-muted-foreground">
              Разкажете ни за бизнеса си и ще ви покажем как AI може да ви спести време и пари.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="relative group/form">
              {/* Subtle animated glow on focus */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-3xl blur-xl opacity-0 group-focus-within/form:opacity-100 transition-opacity duration-500" />

              <div className="glass rounded-3xl p-8 relative hover:glow-gold-sm transition-all duration-500">
                <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-primary" />
                  Запазете консултация
                </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име *</Label>
                    <Input
                      id="name"
                      placeholder="Вашето име"
                      {...register("name")}
                      className={`bg-muted/50 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...register("email")}
                      className={`bg-muted/50 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      placeholder="+359 888 123 456"
                      {...register("phone")}
                      className={`bg-muted/50 ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      placeholder="Име на компанията"
                      {...register("company")}
                      className={`bg-muted/50 ${errors.company ? "border-destructive" : ""}`}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Съобщение</Label>
                  <Textarea
                    id="message"
                    placeholder="Разкажете ни за вашия бизнес и какво бихте искали да автоматизирате..."
                    {...register("message")}
                    rows={5}
                    className={`bg-muted/50 ${errors.message ? "border-destructive" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <div className="relative group/submit">
                  {/* Pulsing glow effect */}
                  <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50 group-hover/submit:opacity-75 animate-pulse" />

                  <Button
                    type="submit"
                    size="lg"
                    className="relative w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Изпращане..."
                    ) : (
                      <>
                        <Send className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        Изпратете заявка
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  С изпращането на формуляра се съгласявате с нашата политика за поверителност.
                </p>
              </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-display font-semibold mb-6">Контактна информация</h2>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="font-medium">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold mb-4">Последвайте ни</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="glass rounded-3xl p-8">
                <h3 className="font-semibold mb-4">Защо да ни изберете?</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Безплатна 30-минутна консултация
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Отговаряме в рамките на 24 часа
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Без ангажимент или скрити такси
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    50+ успешни проекта в България
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
