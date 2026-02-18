import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Tag,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import qdIcon from "@/assets/qd_icon.png";

const ownerNavItems = [
  { path: "/owner-dashboard", label: "Owner Dashboard", icon: ShieldCheck },
];

const biznesNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/debtors", label: "Qarz oluvchilar", icon: FileText },
  { path: "/reports", label: "Hisobotlar", icon: BarChart3 },
  { path: "/payments", label: "To'lovlar", icon: CreditCard },
  { path: "/tariffs", label: "Tarif rejalar", icon: Tag },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = localStorage.getItem("qarzdaftar_role");
  const userName = localStorage.getItem("qarzdaftar_name") || "Foydalanuvchi";
  const isOwner = role === "owner";

  const navItems = isOwner ? ownerNavItems : biznesNavItems;

  const handleLogout = () => {
    localStorage.removeItem("qarzdaftar_auth");
    localStorage.removeItem("qarzdaftar_role");
    localStorage.removeItem("qarzdaftar_name");
    navigate("/login");
  };

  const currentPage = navItems.find((item) => item.path === location.pathname);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 gradient-hero flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to={isOwner ? "/owner-dashboard" : "/dashboard"} className="flex items-center gap-2">
            <img src={qdIcon} alt="Qarzdaftar logo" className="w-9 h-9 rounded-lg object-contain" />
            <span className="font-display font-bold text-xl text-primary-foreground">Qarzdaftar</span>
          </Link>
          <button className="lg:hidden text-primary-foreground/60" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-4 pb-3">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
            isOwner ? "bg-accent/20 text-accent" : "bg-primary-foreground/10 text-primary-foreground/70"
          }`}>
            {isOwner ? <ShieldCheck size={14} /> : <Users size={14} />}
            {isOwner ? "Owner" : "Biznes egasi"}
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-primary-foreground/10 space-y-1">
          <div className="px-4 py-2">
            <p className="text-xs text-primary-foreground/40">Kirgan foydalanuvchi</p>
            <p className="text-sm font-medium text-primary-foreground/80 truncate">{userName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-all w-full"
          >
            <LogOut size={18} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 lg:px-8 h-16 flex items-center gap-4">
          <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{isOwner ? "Owner" : "Biznes egasi"}</span>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium">{currentPage?.label || "Dashboard"}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
