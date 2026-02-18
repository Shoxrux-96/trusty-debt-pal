import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Users list (owner can manage from owner-dashboard)
  const users = [
    { phone: "+998999649695", password: "Shoxrux@9695", role: "owner", name: "Shoxrux Abdullayev" },
    { phone: "+998901234567", password: "Jamshid@1234", role: "biznes", name: "Jamshid Toshmatov" },
    { phone: "+998912345678", password: "Dilshod@2345", role: "biznes", name: "Dilshod Nazarov" },
    { phone: "+998933456789", password: "Otabek@3456", role: "biznes", name: "Otabek Raximov" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanPhone = phone.replace(/\s/g, "");
    const user = users.find(
      (u) => u.phone.replace(/\s/g, "") === cleanPhone && u.password === password
    );

    if (user) {
      localStorage.setItem("qarzdaftar_auth", "true");
      localStorage.setItem("qarzdaftar_role", user.role);
      localStorage.setItem("qarzdaftar_name", user.name);
      if (user.role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast({
        title: "Xatolik",
        description: "Telefon raqam yoki parol noto'g'ri",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

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
              Hisobga kirish
            </h1>
            <p className="text-muted-foreground">
              Hisobingizga kiring va davom eting
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                Telefon raqam
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Kirish..." : "Kirish"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
