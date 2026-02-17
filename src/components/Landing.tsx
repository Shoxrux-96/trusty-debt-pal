import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BarChart3, Bell, Users, Clock, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-image.png";
import qdIcon from "@/assets/qd_icon.png";

const HeroSection = () => (
  <section className="relative gradient-hero overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(40_85%_55%/0.08),transparent_60%)]" />
    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-medium">Biznesingiz uchun qarz boshqaruvi</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up">
            Qarzlarni <span className="text-accent">oson</span> boshqaring
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Do'kon, apteka, oziq-ovqat va boshqa bizneslar uchun qarz oldi-berdi avtomatlashtiruv platformasi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/login">
              <Button variant="hero" size="xl">Bepul boshlash</Button>
            </Link>
            <a href="#features">
              <Button variant="heroOutline" size="xl">Ko'proq bilish</Button>
            </a>
          </div>
          <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-primary-foreground/50 text-sm animate-fade-up" style={{ animationDelay: "0.45s" }}>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-accent" />
              <span>Xavfsiz</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone size={16} className="text-accent" />
              <span>Barcha qurilmalarda</span>
            </div>
          </div>
        </div>
        <div className="relative animate-slide-in-right hidden lg:block">
          <div className="relative animate-float">
            <img
              src={heroImage}
              alt="Qarzdaftar platformasi"
              className="w-full rounded-2xl shadow-elevated"
            />
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border border-accent/20 -z-10" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: BarChart3,
    title: "Qarz hisoboti",
    description: "Barcha qarzlarni real vaqtda kuzating va batafsil hisobotlar oling",
  },
  {
    icon: Bell,
    title: "Avtomatik eslatmalar",
    description: "Mijozlarga qarz to'lash muddati yaqinlashganda avtomatik xabar yuboring",
  },
  {
    icon: Users,
    title: "Mijozlar bazasi",
    description: "Barcha mijozlaringizni bir joyda boshqaring va ularning tarixini ko'ring",
  },
  {
    icon: Clock,
    title: "To'lov tarixi",
    description: "Har bir to'lovni qayd eting va to'lov tarixini to'liq kuzating",
  },
  {
    icon: Shield,
    title: "Xavfsiz ma'lumotlar",
    description: "Ma'lumotlaringiz shifrlangan va xavfsiz serverlarida saqlanadi",
  },
  {
    icon: Smartphone,
    title: "Mobil qulay",
    description: "Telefon, planshet yoki kompyuterdan istalgan vaqtda foydalaning",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Nima uchun <span className="text-accent">Qarzdaftar</span>?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Biznesingizni keyingi bosqichga olib chiqadigan barcha vositalar
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group p-6 lg:p-8 rounded-2xl gradient-card shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 hover:border-accent/30"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <feature.icon size={24} className="text-accent-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-20 lg:py-28 bg-muted/50">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Oddiy va shaffof <span className="text-accent">tariflar</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Biznesingiz hajmiga mos tarifni tanlang
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Boshlang'ich */}
        <div className="p-8 lg:p-10 rounded-2xl bg-card shadow-card border border-border/50 flex flex-col">
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-foreground mb-1">Boshlang'ich</h3>
            <p className="text-muted-foreground text-sm">Kichik bizneslar uchun</p>
          </div>
          <div className="mb-8">
            <span className="font-display text-4xl font-bold text-foreground">Bepul</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {[
              "50 tagacha mijoz",
              "Qarz hisoboti",
              "SMS eslatmalar (cheklangan)",
              "1 ta foydalanuvchi",
              "Mobil qulay interfeys",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/login">
            <Button variant="outline" size="lg" className="w-full">Boshlash</Button>
          </Link>
        </div>

        {/* Professional */}
        <div className="p-8 lg:p-10 rounded-2xl gradient-hero shadow-elevated border border-accent/20 flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
            Mashhur
          </div>
          <div className="mb-6">
            <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">Professional</h3>
            <p className="text-primary-foreground/60 text-sm">O'sib borayotgan bizneslar uchun</p>
          </div>
          <div className="mb-8">
            <span className="font-display text-4xl font-bold text-primary-foreground">99,000</span>
            <span className="text-primary-foreground/60 text-sm ml-1">so'm/oy</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            {[
              "Cheksiz mijozlar",
              "Batafsil hisobotlar va analitika",
              "Cheksiz SMS eslatmalar",
              "5 ta foydalanuvchi",
              "Telegram bot integratsiya",
              "Ustuvor yordam xizmati",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-primary-foreground/90">
                <span className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link to="/login">
            <Button variant="hero" size="lg" className="w-full">Boshlash</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Biz bilan <span className="text-accent">bog'laning</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Savollaringiz bormi? Biz bilan bog'laning — yordam berishdan mamnunmiz
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-5 rounded-2xl gradient-card border border-border/50">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
              <Smartphone size={22} className="text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-1">Telefon</h4>
              <a href="tel:+998999649695" className="text-muted-foreground hover:text-accent transition-colors">
                +998 99 964 96 95
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-2xl gradient-card border border-border/50">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
              <Bell size={22} className="text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-1">Email</h4>
              <a href="mailto:groupwebtexno@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                groupwebtexno@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-2xl gradient-card border border-border/50">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
              <Shield size={22} className="text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-display font-bold text-foreground mb-1">Manzil</h4>
              <p className="text-muted-foreground">O'zbekiston, Xorazm viloyati</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-card min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2266.8324690903637!2d60.28872075684395!3d41.654878640813635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41de49003887a0a7%3A0xc84af4a76a6708f4!2sIT%20Park%20Shovot!5e1!3m2!1suz!2s!4v1771313639271!5m2!1suz!2s"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "300px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Qarzdaftar joylashuvi"
          />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="about" className="gradient-hero py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={qdIcon} alt="Qarzdaftar logo" className="w-9 h-9 rounded-lg object-contain" />
            <span className="font-display font-bold text-xl text-primary-foreground">Qarzdaftar</span>
          </div>
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            Biznesingiz uchun zamonaviy qarz boshqaruv platformasi. Barcha qurilmalarda ishlaydi.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-primary-foreground mb-4">Sahifalar</h4>
          <ul className="space-y-2">
            <li><a href="#features" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">Xususiyatlar</a></li>
            <li><a href="#pricing" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">Tariflar</a></li>
            <li><Link to="/login" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">Kirish</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-primary-foreground mb-4">Aloqa</h4>
          <ul className="space-y-2">
            <li><a href="mailto:groupwebtexno@gmail.com" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">groupwebtexno@gmail.com</a></li>
            <li><a href="tel:+998999649695" className="text-primary-foreground/50 hover:text-accent transition-colors text-sm">+998 99 964 96 95</a></li>
            <li className="text-primary-foreground/50 text-sm">Xorazm, O'zbekiston</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
        <p className="text-primary-foreground/40 text-sm">© 2026 Qarzdaftar. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
  </footer>
);

const Landing = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <PricingSection />
    <ContactSection />
    <Footer />
  </>
);

export default Landing;
