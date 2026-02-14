import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Check } from "lucide-react";

const mockTariffs = [
  {
    id: 1, name: "Boshlang'ich", price: "Bepul", period: "",
    features: ["10 tagacha qarz oluvchi", "Asosiy hisobotlar", "SMS eslatmalar (10/oy)"],
    active: true, users: 85,
  },
  {
    id: 2, name: "Professional", price: "99,000", period: "so'm/oy",
    features: ["Cheksiz qarz oluvchilar", "To'liq hisobotlar", "Cheksiz SMS eslatmalar", "Eksport (Excel, PDF)", "Prioritet qo'llab-quvvatlash"],
    active: true, users: 43,
  },
];

const Tariffs = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Tarif rejalar</h1>
          <p className="text-muted-foreground text-sm mt-1">Tarif rejalarni yaratish va boshqarish</p>
        </div>
        <Button variant="hero" className="gap-2">
          <Plus size={16} /> Yangi tarif
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTariffs.map((tariff) => (
          <Card key={tariff.id} className="shadow-card relative overflow-hidden">
            {tariff.price !== "Bepul" && (
              <div className="absolute top-0 right-0 gradient-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                Mashhur
              </div>
            )}
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-display text-xl font-bold text-foreground">{tariff.name}</h3>
                <div className="mt-2">
                  <span className="font-display text-3xl font-bold text-foreground">{tariff.price}</span>
                  {tariff.period && <span className="text-muted-foreground text-sm ml-1">/{tariff.period}</span>}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {tariff.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-accent shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">{tariff.users} foydalanuvchi</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit size={14} /> Tahrirlash
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tariffs;
