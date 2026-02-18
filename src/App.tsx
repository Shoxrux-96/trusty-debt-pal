import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Debtors from "./pages/Debtors";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import Tariffs from "./pages/Tariffs";
import AdminLayout from "./components/AdminLayout";
import { PaidDebtsProvider } from "./contexts/PaidDebtsContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, ownerOnly = false }: { children: React.ReactNode; ownerOnly?: boolean }) => {
  const isAuth = localStorage.getItem("qarzdaftar_auth") === "true";
  const role = localStorage.getItem("qarzdaftar_role");

  if (!isAuth) return <Navigate to="/login" replace />;
  if (ownerOnly && role !== "owner") return <Navigate to="/dashboard" replace />;
  if (!ownerOnly && role === "owner") return <Navigate to="/owner-dashboard" replace />;

  return <AdminLayout>{children}</AdminLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PaidDebtsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* Owner routes */}
            <Route path="/owner-dashboard" element={<ProtectedRoute ownerOnly><OwnerDashboard /></ProtectedRoute>} />
            {/* Biznes egasi routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/debtors" element={<ProtectedRoute><Debtors /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
            <Route path="/tariffs" element={<ProtectedRoute><Tariffs /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PaidDebtsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

