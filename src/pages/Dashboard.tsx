import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, CreditCard, AlertTriangle, Eye, EyeOff, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
