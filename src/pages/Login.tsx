import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(40_85%_55%/0.1),transparent_60%)]" />
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
              <span className="text-accent-foreground font-display font-bold text-2xl">Q</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary-foreground">Qarzdaftar</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Biznesingizni boshqarish osonlashdi
          </h2>
          <p className="text-primary-foreground/60 text-lg leading-relaxed">
            Qarzlarni kuzating, eslatmalar yuboring va to'lovlarni boshqaring — barchasi bir platformada.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <div className="font-display text-2xl font-bold text-accent mb-1">10,000+</div>
              <div className="text-primary-foreground/50 text-sm">Faol foydalanuvchilar</div>
            </div>
            <div className="p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10">
              <div className="font-display text-2xl font-bold text-accent mb-1">99.9%</div>
              <div className="text-primary-foreground/50 text-sm">Ish vaqti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8">
            <ArrowLeft size={16} />
            Bosh sahifaga
          </Link>

          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">Q</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Qarzdaftar</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {isRegister ? "Hisob yaratish" : "Hisobga kirish"}
            </h1>
            <p className="text-muted-foreground">
              {isRegister
                ? "Bepul hisob yarating va boshlang"
                : "Hisobingizga kiring va davom eting"}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Ism
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ismingizni kiriting"
                  className="h-12 rounded-xl bg-muted/50 border-border focus:border-accent focus:ring-accent"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefon raqam
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                className="h-12 rounded-xl bg-muted/50 border-border focus:border-accent focus:ring-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Parol
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Parolingizni kiriting"
                  className="h-12 rounded-xl bg-muted/50 border-border focus:border-accent focus:ring-accent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button variant="hero" size="lg" className="w-full">
              {isRegister ? "Ro'yxatdan o'tish" : "Kirish"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {isRegister
                ? "Hisobingiz bormi? Kirish"
                : "Hisobingiz yo'qmi? Ro'yxatdan o'ting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
