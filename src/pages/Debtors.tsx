import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, MoreHorizontal } from "lucide-react";

const mockDebtors = [
  { id: 1, name: "Aziz Karimov", phone: "+998 90 111 22 33", totalDebt: "2,500,000", business: "Oziq-ovqat do'koni", dueDate: "2026-03-01", status: "active" },
  { id: 2, name: "Nilufar Tosheva", phone: "+998 91 444 55 66", totalDebt: "1,800,000", business: "Apteka", dueDate: "2026-02-10", status: "overdue" },
  { id: 3, name: "Sardor Aliyev", phone: "+998 93 777 88 99", totalDebt: "3,200,000", business: "Elektronika do'koni", dueDate: "2026-04-15", status: "active" },
  { id: 4, name: "Madina Rahimova", phone: "+998 94 222 33 44", totalDebt: "950,000", business: "Kiyim do'koni", dueDate: "2026-02-01", status: "paid" },
  { id: 5, name: "Bobur Xasanov", phone: "+998 95 666 77 88", totalDebt: "4,100,000", business: "Qurilish do'koni", dueDate: "2026-02-05", status: "overdue" },
  { id: 6, name: "Gulnora Saidova", phone: "+998 97 333 44 55", totalDebt: "1,200,000", business: "Go'sht do'koni", dueDate: "2026-03-20", status: "active" },
];

const Debtors = () => {
  const [search, setSearch] = useState("");

  const filtered = mockDebtors.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Qarz oluvchilar</h1>
          <p className="text-muted-foreground text-sm mt-1">Barcha qarz oluvchilar ro'yxati</p>
        </div>
        <Button variant="hero" className="gap-2">
          <Plus size={16} /> Yangi qarz qo'shish
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Ism yoki telefon bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((debtor) => (
          <Card key={debtor.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold text-foreground truncate">{debtor.name}</h3>
                    <span
                      className={`shrink-0 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        debtor.status === "active"
                          ? "bg-blue-100 text-blue-700"
                          : debtor.status === "overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {debtor.status === "active" ? "Faol" : debtor.status === "overdue" ? "Muddati o'tgan" : "To'langan"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Phone size={13} /> {debtor.phone}</span>
                    <span>{debtor.business}</span>
                    <span>Muddat: {debtor.dueDate}</span>
                  </div>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <div className="font-display font-bold text-foreground">{debtor.totalDebt} <span className="text-xs text-muted-foreground font-normal">so'm</span></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Debtors;
