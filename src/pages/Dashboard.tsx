import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Headphones,
  MessageSquare,
  TrendingUp,
  Clock,
  Settings,
  LogOut,
  Bot,
  Phone,
  BarChart3,
  Plus
} from "lucide-react";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { formatRelativeTime } from "@/lib/dateUtils";

interface Profile {
  full_name: string | null;
  company_name: string | null;
}

interface Agent {
  id: string;
  name: string;
  voice_name: string;
  is_active: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (!session) {
        navigate("/auth");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAgents();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, company_name")
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setIsLoading(false);
  };

  const fetchAgents = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setAgents(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: t('dashboard.logoutToast'),
      description: t('dashboard.logoutSuccess')
    });
    navigate("/");
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
        </div>
      </Layout>
    );
  }

  const stats = [
    { label: t('dashboard.activeAgents'), value: agents.filter(a => a.is_active).length.toString(), icon: Bot },
    { label: t('dashboard.conversationsMonth'), value: "0", icon: MessageSquare },
    { label: t('dashboard.hoursSaved'), value: "0", icon: Clock },
    { label: t('dashboard.conversion'), value: "0%", icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">
                {t('dashboard.welcome')} <span className="text-gradient-gold">{profile?.full_name || t('auth.fullName')}</span>
              </h1>
              <p className="text-muted-foreground">
                {profile?.company_name || t('dashboard.yourPortal')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                {t('dashboard.settings')}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Agents Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold">{t('dashboard.yourAgents')}</h2>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                <Plus className="w-4 h-4" />
                {t('dashboard.newAgent')}
              </Button>
            </div>

            {agents.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('dashboard.noAgents')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('dashboard.noAgentsDesc')}
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="mr-2 w-4 h-4" />
                  {t('dashboard.createAgent')}
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <div key={agent.id} className="glass rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Headphones className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{t('dashboard.voice')}: {agent.voice_name}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        agent.is_active
                          ? "bg-green-500/20 text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {agent.is_active ? t('dashboard.active') : t('dashboard.inactive')}
                      </div>
                    </div>
                    {agent.description && (
                      <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mb-4">
                      {t('dashboard.created')}: {formatRelativeTime(agent.created_at, i18n.language)}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        {t('dashboard.settings')}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        {t('dashboard.analytics')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-3xl p-8">
            <h2 className="text-xl font-display font-semibold mb-6">{t('dashboard.quickActions')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Phone className="w-6 h-6 text-primary" />
                <span>{t('dashboard.testCall')}</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                <span>{t('dashboard.callHistory')}</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                <span>{t('dashboard.detailedAnalytics')}</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Settings className="w-6 h-6 text-primary" />
                <span>{t('dashboard.integrations')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
