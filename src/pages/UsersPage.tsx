import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, Shield, User } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Shoxrux Abdullayev", phone: "+998 99 964 96 95", role: "Owner", status: "active", businesses: 3 },
  { id: 2, name: "Jamshid Toshmatov", phone: "+998 90 123 45 67", role: "Biznes egasi", status: "active", businesses: 1 },
  { id: 3, name: "Dilshod Nazarov", phone: "+998 91 234 56 78", role: "Biznes egasi", status: "active", businesses: 2 },
  { id: 4, name: "Otabek Raximov", phone: "+998 93 345 67 89", role: "Biznes egasi", status: "inactive", businesses: 1 },
];

const UsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Foydalanuvchilar</h1>
          <p className="text-muted-foreground text-sm mt-1">Biznes egalarini boshqarish</p>
        </div>
        <Button variant="hero" className="gap-2">
          <Plus size={16} /> Foydalanuvchi qo'shish
        </Button>
      </div>

      <div className="grid gap-4">
        {mockUsers.map((user) => (
          <Card key={user.id} className="shadow-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${user.role === "Owner" ? "gradient-accent" : "bg-muted"}`}>
                    {user.role === "Owner" ? <Shield size={18} className="text-accent-foreground" /> : <User size={18} className="text-muted-foreground" />}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{user.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-0.5">
                      <span>{user.phone}</span>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "Owner" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{user.businesses} biznes</div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${user.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    {user.status === "active" ? "Faol" : "Nofaol"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
