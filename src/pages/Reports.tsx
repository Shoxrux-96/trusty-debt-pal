import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

const monthlyData = [
  { name: "Yan", income: 12500000, expenses: 8200000 },
  { name: "Fev", income: 15300000, expenses: 9100000 },
  { name: "Mar", income: 11800000, expenses: 7600000 },
  { name: "Apr", income: 14200000, expenses: 8800000 },
  { name: "May", income: 16700000, expenses: 10200000 },
  { name: "Iyun", income: 13900000, expenses: 8500000 },
  { name: "Iyul", income: 17100000, expenses: 11300000 },
  { name: "Avg", income: 15800000, expenses: 9700000 },
  { name: "Sen", income: 18200000, expenses: 12100000 },
  { name: "Okt", income: 16500000, expenses: 10800000 },
  { name: "Noy", income: 19300000, expenses: 13200000 },
  { name: "Dek", income: 21000000, expenses: 14500000 },
];

const yearlyData = [
  { name: "2022", income: 145000000, expenses: 98000000 },
  { name: "2023", income: 178000000, expenses: 112000000 },
  { name: "2024", income: 210000000, expenses: 134000000 },
  { name: "2025", income: 192300000, expenses: 124000000 },
];

const pieColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--destructive))", "hsl(142, 76%, 36%)"];

const chartConfig = {
  income: { label: "Kirim", color: "hsl(142, 76%, 36%)" },
  expenses: { label: "Chiqim", color: "hsl(var(--destructive))" },
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
    const totalIncome = data.reduce((s, d) => s + d.income, 0);
    const totalExpenses = data.reduce((s, d) => s + d.expenses, 0);
    return { income: totalIncome, expenses: totalExpenses, profit: totalIncome - totalExpenses };
  }, [data]);

  const pieData = [
    { name: "Kirim", value: totals.income },
    { name: "Chiqim", value: totals.expenses },
    { name: "Foyda", value: totals.profit },
  ];

  const exportExcel = () => {
    const rows = data.map((d) => ({
      Davr: d.name,
      Kirim: d.income,
      Chiqim: d.expenses,
      Foyda: d.income - d.expenses,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Hisobot");
    XLSX.writeFile(wb, `hisobot_${period}.xlsx`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Hisobotlar</h1>
          <p className="text-muted-foreground text-sm mt-1">Biznes hisobotlari va tahlillar</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-5">
            <DollarSign className="text-accent mb-2" size={20} />
            <div className="font-display text-lg sm:text-xl font-bold text-foreground">{totals.income.toLocaleString()} so'm</div>
            <div className="text-xs text-muted-foreground mt-1">Jami kirim</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5">
            <TrendingDown className="text-destructive mb-2" size={20} />
            <div className="font-display text-lg sm:text-xl font-bold text-foreground">{totals.expenses.toLocaleString()} so'm</div>
            <div className="text-xs text-muted-foreground mt-1">Jami chiqim</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-5">
            <TrendingUp className="text-emerald-500 mb-2" size={20} />
            <div className="font-display text-lg sm:text-xl font-bold text-foreground">{totals.profit.toLocaleString()} so'm</div>
            <div className="text-xs text-muted-foreground mt-1">Sof foyda</div>
          </CardContent>
        </Card>
      </div>

      {/* Main chart */}
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 size={16} />
            {period === "monthly" ? "Oylik" : "Yillik"} kirim-chiqim ({chartType === "bar" ? "ustunli" : "chiziqli"})
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
                <Bar dataKey="income" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                <YAxis tickFormatter={formatMoney} tick={{ fontSize: 11 }} className="fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent formatter={(v) => `${Number(v).toLocaleString()} so'm`} />} />
                <Line type="monotone" dataKey="income" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            )}
          </ChartContainer>
          <div className="flex items-center justify-center gap-6 mt-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: "hsl(142, 76%, 36%)" }} /> Kirim</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-destructive" /> Chiqim</span>
          </div>
        </CardContent>
      </Card>

      {/* Pie + Table row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie chart */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Taqsimot</CardTitle>
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

        {/* Data table */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Batafsil jadval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 px-2 text-muted-foreground font-medium">Davr</th>
                    <th className="text-right py-2.5 px-2 text-muted-foreground font-medium">Kirim</th>
                    <th className="text-right py-2.5 px-2 text-muted-foreground font-medium">Chiqim</th>
                    <th className="text-right py-2.5 px-2 text-muted-foreground font-medium">Foyda</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.name} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-2.5 px-2 font-medium text-foreground">{row.name}</td>
                      <td className="py-2.5 px-2 text-right text-emerald-600">{row.income.toLocaleString()}</td>
                      <td className="py-2.5 px-2 text-right text-destructive">{row.expenses.toLocaleString()}</td>
                      <td className="py-2.5 px-2 text-right font-medium text-foreground">{(row.income - row.expenses).toLocaleString()}</td>
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
