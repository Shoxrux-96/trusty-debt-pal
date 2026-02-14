import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, CreditCard, AlertTriangle } from "lucide-react";

const stats = [
  { title: "Jami qarz", value: "45,200,000 so'm", change: "+12%", icon: CreditCard, color: "text-accent" },
  { title: "Qarz oluvchilar", value: "128", change: "+5", icon: Users, color: "text-blue-500" },
  { title: "Bugungi to'lovlar", value: "3,500,000 so'm", change: "+8%", icon: TrendingUp, color: "text-emerald-500" },
  { title: "Muddati o'tgan", value: "23", change: "-3", icon: AlertTriangle, color: "text-destructive" },
];

const recentDebtors = [
  { name: "Aziz Karimov", phone: "+998 90 111 22 33", amount: "2,500,000", status: "active" },
  { name: "Nilufar Tosheva", phone: "+998 91 444 55 66", amount: "1,800,000", status: "overdue" },
  { name: "Sardor Aliyev", phone: "+998 93 777 88 99", amount: "3,200,000", status: "active" },
  { name: "Madina Rahimova", phone: "+998 94 222 33 44", amount: "950,000", status: "paid" },
  { name: "Bobur Xasanov", phone: "+998 95 666 77 88", amount: "4,100,000", status: "overdue" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platformaning umumiy ko'rinishi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`${stat.color}`} size={22} />
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {stat.change}
                </span>
              </div>
              <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent debtors */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">So'nggi qarz oluvchilar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Ism</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Telefon</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Qarz</th>
                  <th className="text-center py-3 px-2 text-muted-foreground font-medium">Holat</th>
                </tr>
              </thead>
              <tbody>
                {recentDebtors.map((d) => (
                  <tr key={d.name} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{d.name}</td>
                    <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{d.phone}</td>
                    <td className="py-3 px-2 text-right text-foreground">{d.amount}</td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          d.status === "active"
                            ? "bg-blue-100 text-blue-700"
                            : d.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {d.status === "active" ? "Faol" : d.status === "overdue" ? "Muddati o'tgan" : "To'langan"}
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

export default Dashboard;
