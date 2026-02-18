import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users, ShieldCheck, TrendingUp, Building2,
  Eye, EyeOff, Pencil, Check, X, Plus, Trash2,
  Phone, KeyRound, UserCheck, UserX,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: number;
  name: string;
  phone: string;
  password: string;
  role: string;
  status: "active" | "inactive";
  businesses: number;
  tariff: string;
}

const initialUsers: UserData[] = [
  { id: 1, name: "Shoxrux Abdullayev", phone: "+998999649695", password: "Shoxrux@9695", role: "Owner", status: "active", businesses: 3, tariff: "Premium" },
  { id: 2, name: "Jamshid Toshmatov", phone: "+998901234567", password: "Jamshid@1234", role: "Biznes egasi", status: "active", businesses: 1, tariff: "Standart" },
  { id: 3, name: "Dilshod Nazarov", phone: "+998912345678", password: "Dilshod@2345", role: "Biznes egasi", status: "active", businesses: 2, tariff: "Premium" },
  { id: 4, name: "Otabek Raximov", phone: "+998933456789", password: "Otabek@3456", role: "Biznes egasi", status: "inactive", businesses: 1, tariff: "Bepul" },
];

const statCards = [
  { title: "Jami foydalanuvchilar", value: "4", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Faol bizneslar", value: "7", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Bu oy daromad", value: "2,400,000", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  { title: "Premium foydalanuvchilar", value: "2", icon: ShieldCheck, color: "text-violet-500", bg: "bg-violet-500/10" },
];

const emptyForm = { name: "", phone: "", password: "", tariff: "Bepul" };

const OwnerDashboard = () => {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ phone: "", password: "" });
  const [addOpen, setAddOpen] = useState(false);
  const [newForm, setNewForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<UserData | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [nextId, setNextId] = useState(5);
  const { toast } = useToast();

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
    toast({ title: "Saqlandi", description: "Foydalanuvchi ma'lumotlari yangilandi" });
  };

  const toggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u))
    );
  };

  const handleAdd = () => {
    if (!newForm.name || !newForm.phone || !newForm.password) {
      toast({ title: "Xatolik", description: "Barcha maydonlarni to'ldiring", variant: "destructive" });
      return;
    }
    const newUser: UserData = {
      id: nextId,
      name: newForm.name,
      phone: newForm.phone,
      password: newForm.password,
      role: "Biznes egasi",
      status: "active",
      businesses: 0,
      tariff: newForm.tariff,
    };
    setUsers((prev) => [...prev, newUser]);
    setNextId((n) => n + 1);
    setNewForm(emptyForm);
    setAddOpen(false);
    toast({ title: "Qo'shildi", description: `${newUser.name} tizimga qo'shildi` });
  };

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteTarget(null);
    toast({ title: "O'chirildi", description: "Foydalanuvchi o'chirildi", variant: "destructive" });
  };

  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.filter((u) => u.status === "inactive").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="text-accent" size={24} />
            Owner Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Platforma foydalanuvchilarini boshqaring
          </p>
        </div>
        <Button variant="hero" className="gap-2 w-fit" onClick={() => setAddOpen(true)}>
          <Plus size={16} /> Yangi foydalanuvchi
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((card) => (
          <Card key={card.title} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${card.bg}`}>
                <card.icon className={card.color} size={20} />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-foreground">{card.value}</div>
                <div className="text-[11px] text-muted-foreground leading-tight">{card.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active/Inactive summary */}
      <div className="flex gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <UserCheck size={14} /> {activeCount} faol
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
          <UserX size={14} /> {inactiveCount} nofaol
        </div>
      </div>

      {/* Users table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users size={18} /> Foydalanuvchilar ro'yxati
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">№</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ism</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><Phone size={13} /> Login (telefon)</span>
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><KeyRound size={13} /> Parol</span>
                  </th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Tarif</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Holat</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role}</div>
                    </td>
                    <td className="py-3 px-4">
                      {editingId === user.id ? (
                        <Input
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="h-8 w-[180px]"
                        />
                      ) : (
                        <span className="font-mono text-sm text-foreground">{user.phone}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {editingId === user.id ? (
                          <Input
                            type={visiblePasswords[user.id] ? "text" : "password"}
                            value={editForm.password}
                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                            className="h-8 w-[150px]"
                          />
                        ) : (
                          <span className="font-mono text-xs text-foreground">
                            {visiblePasswords[user.id] ? user.password : "••••••••••"}
                          </span>
                        )}
                        <button
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {visiblePasswords[user.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant="secondary"
                        className={
                          user.tariff === "Premium"
                            ? "bg-accent/15 text-accent border-accent/20"
                            : user.tariff === "Standart"
                            ? "bg-primary/10 text-primary border-primary/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {user.tariff}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => toggleStatus(user.id)}>
                        <Badge
                          className={`cursor-pointer transition-colors ${
                            user.status === "active"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {user.status === "active" ? "Faol" : "Nofaol"}
                        </Badge>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {editingId === user.id ? (
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" onClick={() => saveEdit(user.id)}>
                            <Check size={15} />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={cancelEdit}>
                            <X size={15} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => startEdit(user)}>
                            <Pencil size={14} />
                          </Button>
                          {user.role !== "Owner" && (
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteTarget(user)}>
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 p-4">
            {users.map((user, idx) => (
              <div key={user.id} className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}>
                      {user.status === "active" ? "Faol" : "Nofaol"}
                    </Badge>
                    <Badge variant="secondary" className={user.tariff === "Premium" ? "bg-violet-100 text-violet-700" : "bg-muted text-muted-foreground"}>
                      {user.tariff}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-muted-foreground" />
                    <span className="font-mono text-foreground">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <KeyRound size={12} className="text-muted-foreground" />
                    <span className="font-mono text-xs text-foreground">
                      {visiblePasswords[user.id] ? user.password : "••••••••••"}
                    </span>
                    <button onClick={() => togglePasswordVisibility(user.id)} className="text-muted-foreground">
                      {visiblePasswords[user.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1 h-8" onClick={() => startEdit(user)}>
                    <Pencil size={13} /> Tahrirlash
                  </Button>
                  {user.role !== "Owner" && (
                    <Button size="sm" variant="outline" className="gap-1 h-8 text-destructive border-destructive/30" onClick={() => setDeleteTarget(user)}>
                      <Trash2 size={13} /> O'chirish
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add user dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus size={18} /> Yangi foydalanuvchi qo'shish
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Ism Familiya</Label>
              <Input
                placeholder="Masalan: Alisher Karimov"
                value={newForm.name}
                onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon raqam (login)</Label>
              <Input
                placeholder="+998 90 123 45 67"
                value={newForm.phone}
                onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Parol</Label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Kuchli parol kiriting"
                  value={newForm.password}
                  onChange={(e) => setNewForm({ ...newForm, password: e.target.value })}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tarif rejasi</Label>
              <div className="grid grid-cols-3 gap-2">
                {["Bepul", "Standart", "Premium"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setNewForm({ ...newForm, tariff: t })}
                    className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                      newForm.tariff === t
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:border-accent/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Bekor qilish</Button>
            <Button variant="hero" onClick={handleAdd}>Qo'shish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            <strong>{deleteTarget?.name}</strong> foydalanuvchisini tizimdan o'chirmoqchimisiz?
            Bu amalni ortga qaytarib bo'lmaydi.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Yo'q</Button>
            <Button variant="destructive" onClick={() => deleteTarget && handleDelete(deleteTarget.id)}>
              Ha, o'chirish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OwnerDashboard;
