import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Headphones, User, Sparkles, Cpu, TrendingUp, Calculator, DollarSign, MessageSquare, LayoutDashboard, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Начало" },
  { href: "/voices", label: "Гласове" },
  { href: "/services", label: "Услуги" },
  { href: "/services/packages", label: "Пакети" },
  { href: "/cases", label: "Разработки" },
  { href: "/pricing", label: "Цени" },
  { href: "/contact", label: "Контакт" },
];

// Page-specific icons mapping
const pageIcons: Record<string, { icon: React.ElementType; animated?: boolean }> = {
  "/": { icon: Bot, animated: false },
  "/voices": { icon: Headphones, animated: true },
  "/services": { icon: Cpu, animated: false },
  "/cases": { icon: TrendingUp, animated: false },
  "/calculator": { icon: Calculator, animated: false },
  "/pricing": { icon: DollarSign, animated: false },
  "/contact": { icon: MessageSquare, animated: false },
  "/auth": { icon: User, animated: false },
  "/dashboard": { icon: LayoutDashboard, animated: false },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Get the current page icon
  const currentPageConfig = pageIcons[location.pathname] || { icon: Bot, animated: false };
  const CurrentIcon = currentPageConfig.icon;
  const isAnimated = currentPageConfig.animated ?? false;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.jpg"
              alt="Save My Time Logo"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Вход
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold-sm">
                Безплатна консултация
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full gap-2">
                  <User className="w-4 h-4" />
                  Вход
                </Button>
              </Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground">
                  Безплатна консултация
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
