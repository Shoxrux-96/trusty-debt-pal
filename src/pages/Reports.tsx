import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart3, Calendar, Download, Wallet, CheckCircle, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

const monthlyData = [
  { name: "Yan", totalDebt: 18500000, collected: 12500000, remaining: 6000000, givenToday: 2100000, collectedToday: 1800000 },
  { name: "Fev", totalDebt: 21300000, collected: 15300000, remaining: 6000000, givenToday: 3200000, collectedToday: 2400000 },
  { name: "Mar", totalDebt: 19800000, collected: 11800000, remaining: 8000000, givenToday: 1500000, collectedToday: 1200000 },
  { name: "Apr", totalDebt: 22200000, collected: 14200000, remaining: 8000000, givenToday: 2800000, collectedToday: 2100000 },
  { name: "May", totalDebt: 24700000, collected: 16700000, remaining: 8000000, givenToday: 3500000, collectedToday: 2900000 },
  { name: "Iyun", totalDebt: 20900000, collected: 13900000, remaining: 7000000, givenToday: 1900000, collectedToday: 1600000 },
  { name: "Iyul", totalDebt: 26100000, collected: 17100000, remaining: 9000000, givenToday: 4100000, collectedToday: 3200000 },
  { name: "Avg", totalDebt: 23800000, collected: 15800000, remaining: 8000000, givenToday: 2700000, collectedToday: 2300000 },
  { name: "Sen", totalDebt: 28200000, collected: 18200000, remaining: 10000000, givenToday: 3800000, collectedToday: 3100000 },
  { name: "Okt", totalDebt: 25500000, collected: 16500000, remaining: 9000000, givenToday: 2400000, collectedToday: 2000000 },
  { name: "Noy", totalDebt: 30300000, collected: 19300000, remaining: 11000000, givenToday: 4500000, collectedToday: 3700000 },
  { name: "Dek", totalDebt: 33000000, collected: 21000000, remaining: 12000000, givenToday: 5200000, collectedToday: 4100000 },
];

const yearlyData = [
  { name: "2022", totalDebt: 185000000, collected: 145000000, remaining: 40000000, givenToday: 0, collectedToday: 0 },
  { name: "2023", totalDebt: 228000000, collected: 178000000, remaining: 50000000, givenToday: 0, collectedToday: 0 },
  { name: "2024", totalDebt: 274000000, collected: 210000000, remaining: 64000000, givenToday: 0, collectedToday: 0 },
  { name: "2025", totalDebt: 294300000, collected: 192300000, remaining: 102000000, givenToday: 0, collectedToday: 0 },
];

const pieColors = ["hsl(var(--primary))", "hsl(142, 76%, 36%)", "hsl(var(--destructive))"];

const chartConfig = {
  totalDebt: { label: "Jami qarz", color: "hsl(var(--primary))" },
  collected: { label: "Undirilgan", color: "hsl(142, 76%, 36%)" },
  remaining: { label: "Qolgan", color: "hsl(var(--destructive))" },
};

const formatMoney = (v: number) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toString();
};

const Reports = () => {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const data = period === "monthly" ? monthlyData : yearlyData;

  const totals = useMemo(() => {
    const last = data[data.length - 1];
    return {
      totalDebt: last.totalDebt,
      collected: last.collected,
      remaining: last.remaining,
      givenToday: period === "monthly" ? last.givenToday : data.reduce((s, d) => s + d.givenToday, 0),
      collectedToday: period === "monthly" ? last.collectedToday : data.reduce((s, d) => s + d.collectedToday, 0),
    };
  }, [data, period]);

  const pieData = [
    { name: "Jami qarz", value: totals.totalDebt },
    { name: "Undirilgan", value: totals.collected },
    { name: "Qolgan qarz", value: totals.remaining },
  ];

  const exportExcel = () => {
    const rows = data.map((d) => ({
      Davr: d.name,
      "Jami qarz": d.totalDebt,
      "Undirilgan qarz": d.collected,
      "Qolgan qarz": d.remaining,
      "Bugungi berilgan": d.givenToday,
      "Bugungi undirilgan": d.collectedToday,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hisobot");
    XLSX.writeFile(wb, `qarz_hisobot_${period}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Qarz hisobotlari</h1>
          <p className="text-muted-foreground text-sm mt-1">Qarzlar bo'yicha tahlil va statistika</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v as "monthly" | "yearly")}>
            <SelectTrigger className="w-[130px]">
              <Calendar size={14} className="mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Oylik</SelectItem>
              <SelectItem value="yearly">Yillik</SelectItem>
            </SelectContent>
          </Select>
          <Select value={chartType} onValueChange={(v) => setChartType(v as "bar" | "line")}>
            <SelectTrigger className="w-[130px]">
              <BarChart3 size={14} className="mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Ustunli</SelectItem>
              <SelectItem value="line">Chiziqli</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={exportExcel}>
            <Download size={14} className="mr-1" /> Excel
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <Wallet className="text-primary mb-2" size={18} />
            <div className="font-display text-sm sm:text-base font-bold text-foreground">{totals.totalDebt.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Jami qarz</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <CheckCircle className="text-emerald-500 mb-2" size={18} />
            <div className="font-display text-sm sm:text-base font-bold text-foreground">{totals.collected.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Undirilgan qarz</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <Clock className="text-destructive mb-2" size={18} />
            <div className="font-display text-sm sm:text-base font-bold text-foreground">{totals.remaining.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Undirilmagan qarz</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <ArrowUpRight className="text-amber-500 mb-2" size={18} />
            <div className="font-display text-sm sm:text-base font-bold text-foreground">{totals.givenToday.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Bugungi berilgan</div>
          </CardContent>
        </Card>
        <Card className="shadow-card col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <ArrowDownRight className="text-emerald-500 mb-2" size={18} />
            <div className="font-display text-sm sm:text-base font-bold text-foreground">{totals.collectedToday.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Bugungi undirilgan</div>
          </CardContent>
        </Card>
      </div>

      {/* Main chart */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 size={16} />
            {period === "monthly" ? "Oylik" : "Yillik"} qarz dinamikasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] sm:h-[350px] w-full">
            {chartType === "bar" ? (
              <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tickFormatter={formatMoney} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent formatter={(v) => `${Number(v).toLocaleString()} so'm`} />} />
                <Bar dataKey="totalDebt" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="collected" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="remaining" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tickFormatter={formatMoney} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent formatter={(v) => `${Number(v).toLocaleString()} so'm`} />} />
                <Line type="monotone" dataKey="totalDebt" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="collected" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="remaining" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            )}
          </ChartContainer>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-xs flex-wrap">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary" /> Jami qarz</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(142, 76%, 36%)" }} /> Undirilgan</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-destructive" /> Qolgan</span>
          </div>
        </CardContent>
      </Card>

      {/* Pie + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Qarz taqsimoti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(v) => `${Number(v).toLocaleString()} so'm`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
              {pieData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ background: pieColors[i] }} />
                  {d.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Batafsil jadval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-muted-foreground font-medium text-xs">Davr</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium text-xs">Jami</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium text-xs">Undirilgan</th>
                    <th className="text-right py-2 px-2 text-muted-foreground font-medium text-xs">Qolgan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.name} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-2 px-2 font-medium text-foreground text-xs">{row.name}</td>
                      <td className="py-2 px-2 text-right text-xs">{row.totalDebt.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-xs text-emerald-600">{row.collected.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-xs text-destructive">{row.remaining.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
