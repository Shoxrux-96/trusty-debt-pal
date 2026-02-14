import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, Clock, XCircle } from "lucide-react";

const mockPayments = [
  { id: 1, debtor: "Aziz Karimov", amount: "500,000", date: "2026-02-14", method: "Naqd", status: "completed" },
  { id: 2, debtor: "Nilufar Tosheva", amount: "300,000", date: "2026-02-13", method: "Karta", status: "completed" },
  { id: 3, debtor: "Sardor Aliyev", amount: "1,000,000", date: "2026-02-12", method: "Naqd", status: "pending" },
  { id: 4, debtor: "Bobur Xasanov", amount: "750,000", date: "2026-02-11", method: "Karta", status: "completed" },
  { id: 5, debtor: "Gulnora Saidova", amount: "200,000", date: "2026-02-10", method: "Naqd", status: "cancelled" },
];

const Payments = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">To'lovlar</h1>
          <p className="text-muted-foreground text-sm mt-1">To'lovlarni qabul qilish va boshqarish</p>
        </div>
        <Button variant="hero" className="gap-2">
          <Plus size={16} /> To'lov qabul qilish
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Qarz oluvchi</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Summa</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden sm:table-cell">Sana</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium hidden md:table-cell">Usul</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{p.debtor}</td>
                    <td className="py-3 px-4 text-right text-foreground">{p.amount} so'm</td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{p.date}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{p.method}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                        p.status === "pending" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {p.status === "completed" ? <><CheckCircle size={12} /> Qabul qilingan</> :
                         p.status === "pending" ? <><Clock size={12} /> Kutilmoqda</> :
                         <><XCircle size={12} /> Bekor qilingan</>}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
