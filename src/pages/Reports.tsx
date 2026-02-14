import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const monthlyData = [
  { month: "Yanvar", income: "12,500,000", expenses: "8,200,000" },
  { month: "Fevral", income: "15,300,000", expenses: "9,100,000" },
  { month: "Mart", income: "11,800,000", expenses: "7,600,000" },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Hisobotlar</h1>
        <p className="text-muted-foreground text-sm mt-1">Biznes hisobotlari va tahlillar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <DollarSign className="text-accent mb-3" size={22} />
            <div className="font-display text-xl font-bold text-foreground">39,600,000 so'm</div>
            <div className="text-sm text-muted-foreground mt-1">Jami kirim</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <TrendingUp className="text-emerald-500 mb-3" size={22} />
            <div className="font-display text-xl font-bold text-foreground">24,900,000 so'm</div>
            <div className="text-sm text-muted-foreground mt-1">Jami chiqim</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <TrendingDown className="text-destructive mb-3" size={22} />
            <div className="font-display text-xl font-bold text-foreground">14,700,000 so'm</div>
            <div className="text-sm text-muted-foreground mt-1">Sof foyda</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><BarChart3 size={18} /> Oylik hisobot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Oy</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Kirim</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Chiqim</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Foyda</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row) => (
                  <tr key={row.month} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-2 font-medium text-foreground">{row.month}</td>
                    <td className="py-3 px-2 text-right text-emerald-600">{row.income}</td>
                    <td className="py-3 px-2 text-right text-destructive">{row.expenses}</td>
                    <td className="py-3 px-2 text-right font-medium text-foreground">
                      {(parseInt(row.income.replace(/,/g, "")) - parseInt(row.expenses.replace(/,/g, ""))).toLocaleString()} so'm
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

export default Reports;
