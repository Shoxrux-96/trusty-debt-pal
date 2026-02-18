import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, CreditCard, AlertTriangle, ArrowUpRight, ArrowDownRight, Wallet, Clock } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

type Period = "kunlik" | "haftalik" | "oylik";

const dailyData = [
  { name: "Dush", jami: 4200, undirilgan: 2800, undirilmagan: 1400 },
  { name: "Sesh", jami: 3800, undirilgan: 2400, undirilmagan: 1400 },
  { name: "Chor", jami: 5100, undirilgan: 3200, undirilmagan: 1900 },
  { name: "Pay", jami: 4600, undirilgan: 3100, undirilmagan: 1500 },
  { name: "Jum", jami: 3900, undirilgan: 2700, undirilmagan: 1200 },
  { name: "Shan", jami: 2200, undirilgan: 1500, undirilmagan: 700 },
  { name: "Yak", jami: 1800, undirilgan: 1200, undirilmagan: 600 },
];

const weeklyData = [
  { name: "1-hafta", jami: 22000, undirilgan: 14500, undirilmagan: 7500 },
  { name: "2-hafta", jami: 25000, undirilgan: 17000, undirilmagan: 8000 },
  { name: "3-hafta", jami: 21000, undirilgan: 13500, undirilmagan: 7500 },
  { name: "4-hafta", jami: 27000, undirilgan: 19000, undirilmagan: 8000 },
];

const monthlyData = [
  { name: "Yan", jami: 85000, undirilgan: 58000, undirilmagan: 27000 },
  { name: "Fev", jami: 92000, undirilgan: 65000, undirilmagan: 27000 },
  { name: "Mar", jami: 78000, undirilgan: 52000, undirilmagan: 26000 },
  { name: "Apr", jami: 95000, undirilgan: 68000, undirilmagan: 27000 },
  { name: "May", jami: 88000, undirilgan: 60000, undirilmagan: 28000 },
  { name: "Iyn", jami: 102000, undirilgan: 72000, undirilmagan: 30000 },
];

const pieData = [
  { name: "Undirilgan", value: 65, color: "hsl(152, 60%, 45%)" },
  { name: "Undirilmagan", value: 23, color: "hsl(0, 72%, 51%)" },
  { name: "Muddati o'tgan", value: 12, color: "hsl(40, 85%, 55%)" },
];

const dataByPeriod: Record<Period, typeof dailyData> = {
  kunlik: dailyData,
  haftalik: weeklyData,
  oylik: monthlyData,
};

const stats = [
  { title: "Jami qarz", value: "45,200,000", suffix: "so'm", change: "+12%", up: true, icon: CreditCard, color: "text-accent" },
  { title: "Qarz oluvchilar", value: "128", suffix: "ta", change: "+5", up: true, icon: Users, color: "text-blue-500" },
  { title: "Bugungi to'lovlar", value: "3,500,000", suffix: "so'm", change: "+8%", up: true, icon: TrendingUp, color: "text-emerald-500" },
  { title: "Muddati o'tgan", value: "23", suffix: "ta", change: "-3", up: false, icon: AlertTriangle, color: "text-destructive" },
  { title: "Undirilgan", value: "28,800,000", suffix: "so'm", change: "+15%", up: true, icon: Wallet, color: "text-emerald-600" },
  { title: "Undirilishi kerak", value: "16,400,000", suffix: "so'm", change: "-2%", up: false, icon: Clock, color: "text-amber-500" },
];

const chartConfig = {
  jami: { label: "Jami qarz", color: "hsl(213, 55%, 20%)" },
  undirilgan: { label: "Undirilgan", color: "hsl(152, 60%, 45%)" },
  undirilmagan: { label: "Undirilmagan", color: "hsl(0, 72%, 51%)" },
};

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>("oylik");
  const userName = localStorage.getItem("qarzdaftar_name") || "Biznes egasi";

  const data = dataByPeriod[period];

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Kunlik", value: "kunlik" },
    { label: "Haftalik", value: "haftalik" },
    { label: "Oylik", value: "oylik" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Xush kelibsiz, {userName.split(" ")[0]}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Biznesingizning bugungi holati</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={stat.color} size={18} />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-primary" : "text-destructive"}`}>
                  {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </span>
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-foreground leading-tight">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Period filter */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        {periodButtons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setPeriod(btn.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              period === btn.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar chart */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Qarz va to'lovlar dinamikasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[220px] sm:h-[280px] w-full">
              <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="jami" fill="var(--color-jami)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="undirilgan" fill="var(--color-undirilgan)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="undirilmagan" fill="var(--color-undirilmagan)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Qarz taqsimoti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] sm:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => `${val}%`} />
                  <Legend
                    verticalAlign="bottom"
                    formatter={(value: string) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Line chart */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Undirilgan va undirilmagan to'lovlar trendi</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] sm:h-[260px] w-full">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} className="fill-muted-foreground" />
              <YAxis tick={{ fontSize: 11 }} className="fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="undirilgan" stroke="var(--color-undirilgan)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="undirilmagan" stroke="var(--color-undirilmagan)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

