import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, CreditCard, AlertTriangle, Eye, EyeOff, Pencil, Check, X, ArrowUpRight, ArrowDownRight, Wallet, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface UserData {
  id: number;
  name: string;
  phone: string;
  password: string;
  role: string;
  status: "active" | "inactive";
  businesses: number;
}

const initialUsers: UserData[] = [
  { id: 1, name: "Shoxrux Abdullayev", phone: "+998999649695", password: "Shoxrux@9695", role: "Owner", status: "active", businesses: 3 },
  { id: 2, name: "Jamshid Toshmatov", phone: "+998901234567", password: "Jamshid@1234", role: "Biznes egasi", status: "active", businesses: 1 },
  { id: 3, name: "Dilshod Nazarov", phone: "+998912345678", password: "Dilshod@2345", role: "Biznes egasi", status: "active", businesses: 2 },
  { id: 4, name: "Otabek Raximov", phone: "+998933456789", password: "Otabek@3456", role: "Biznes egasi", status: "inactive", businesses: 1 },
];

const Dashboard = () => {
  const [period, setPeriod] = useState<Period>("oylik");
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ phone: "", password: "" });

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startEdit = (user: UserData) => {
    setEditingId(user.id);
    setEditForm({ phone: user.phone, password: user.password });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ phone: "", password: "" });
  };

  const saveEdit = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, phone: editForm.phone, password: editForm.password } : u))
    );
    setEditingId(null);
  };

  const data = dataByPeriod[period];

  const periodButtons: { label: string; value: Period }[] = [
    { label: "Kunlik", value: "kunlik" },
    { label: "Haftalik", value: "haftalik" },
    { label: "Oylik", value: "oylik" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Platformaning umumiy ko'rinishi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={stat.color} size={18} />
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-destructive"}`}>
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

      {/* Users table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={20} /> Foydalanuvchilar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">№</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Ism</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Login (telefon)</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Parol</th>
                  <th className="text-center py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Role</th>
                  <th className="text-center py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Holat</th>
                  <th className="text-center py-3 px-2 text-muted-foreground font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 text-muted-foreground">{idx + 1}</td>
                    <td className="py-3 px-2 font-medium text-foreground">{user.name}</td>
                    <td className="py-3 px-2">
                      {editingId === user.id ? (
                        <Input
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="h-8 w-full max-w-[180px]"
                        />
                      ) : (
                        <span className="text-foreground">{user.phone}</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        {editingId === user.id ? (
                          <Input
                            type={visiblePasswords[user.id] ? "text" : "password"}
                            value={editForm.password}
                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            className="h-8 w-full max-w-[160px]"
                          />
                        ) : (
                          <span className="text-foreground font-mono text-xs">
                            {visiblePasswords[user.id] ? user.password : "••••••••"}
                          </span>
                        )}
                        <button
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {visiblePasswords[user.id] ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center hidden sm:table-cell">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "Owner" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center hidden sm:table-cell">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.status === "active" ? "Faol" : "Nofaol"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {editingId === user.id ? (
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-600" onClick={() => saveEdit(user.id)}>
                            <Check size={15} />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={cancelEdit}>
                            <X size={15} />
                          </Button>
                        </div>
                      ) : (
                        <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(user)}>
                          <Pencil size={15} />
                        </Button>
                      )}
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
