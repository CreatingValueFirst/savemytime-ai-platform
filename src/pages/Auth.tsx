import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Headphones, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;

        toast({
          title: t('auth.welcomeToast'),
          description: t('auth.loginSuccess')
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.fullName
            }
          }
        });

        if (error) throw error;

        toast({
          title: t('auth.accountCreated'),
          description: t('auth.signupSuccess')
        });
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = t('auth.tryAgain');

      if (error.message?.includes("Invalid login credentials")) {
        errorMessage = t('auth.wrongCredentials');
      } else if (error.message?.includes("User already registered")) {
        errorMessage = t('auth.emailExists');
      } else if (error.message?.includes("Password should be at least")) {
        errorMessage = t('auth.passwordLength');
      }

      toast({
        title: t('auth.error'),
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-10 group">
          <div className="relative">
            {/* Intense glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 animate-pulse">
              <div className="w-full h-full bg-green-neon/50 rounded-full scale-150"></div>
            </div>

            {/* Hero Logo */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-neon via-green-vivid to-green glow-green-intense neon-border group-hover:scale-110 transition-all duration-500">
                <span className="text-5xl font-bold text-white scale-pulse">⚡</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-display font-extrabold text-gradient-green leading-tight tracking-tight text-glow">
                  SaveMyTime
                </span>
                <span className="text-sm font-bold text-green-light tracking-widest uppercase mt-1">
                  AI Automation Platform
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold mb-2">
              {isLogin ? t('auth.welcome') : t('auth.createAccount')}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? t('auth.loginSubtitle')
                : t('auth.signupSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder={t('auth.fullNamePlaceholder')}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10 bg-muted/50"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-muted/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 bg-muted/50"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? t('auth.login') : t('auth.signup')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? t('auth.noAccount')
                : t('auth.hasAccount')}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">
            {t('auth.backToHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}
