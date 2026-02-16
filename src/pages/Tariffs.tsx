import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/components/ui/pagination";
import { Check, Copy, CreditCard, CalendarDays, CheckCircle, Clock, Download } from "lucide-react";
import * as XLSX from "xlsx";

const currentPlan = {
  name: "Professional",
  price: "99,000",
  period: "oylik",
  yearlyPrice: "999,000",
  features: [
    "Cheksiz qarz oluvchilar",
    "To'liq hisobotlar",
    "Cheksiz SMS eslatmalar",
    "Eksport (Excel, PDF)",
    "Prioritet qo'llab-quvvatlash",
  ],
  startDate: "2025-06-01",
  nextPayment: "2026-03-01",
};

const businessAccountId = "QD-2026-00847";

interface PlatformPayment {
  id: number;
  date: string;
  amount: number;
  type: "oylik" | "yillik";
  status: "paid" | "pending";
  period: string;
}

function generatePlatformPayments(count: number): PlatformPayment[] {
  const payments: PlatformPayment[] = [];
  for (let i = 1; i <= count; i++) {
    const isYearly = i % 8 === 0;
    const month = String(1 + ((i - 1) % 12)).padStart(2, "0");
    const year = 2025 + Math.floor((i - 1) / 12);
    const periodEnd = isYearly
      ? `${year}-${month} — ${year + 1}-${month}`
      : `${year}-${month}`;
    payments.push({
      id: i,
      date: `${year}-${month}-01`,
      amount: isYearly ? 999000 : 99000,
      type: isYearly ? "yillik" : "oylik",
      status: i <= count - 2 ? "paid" : "pending",
      period: periodEnd,
    });
  }
  return payments;
}

const PAGE_SIZE = 15;

const Tariffs = () => {
  const [payments] = useState<PlatformPayment[]>(() => generatePlatformPayments(60));
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false);

  const totalPages = Math.ceil(payments.length / PAGE_SIZE);
  const paged = payments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const formatSum = (n: number) => n.toLocaleString("uz-UZ");

  const copyId = () => {
    navigator.clipboard.writeText(businessAccountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToExcel = () => {
    const data = payments.map((p) => ({
      "Sana": p.date,
      "Summa": p.amount,
      "Turi": p.type === "oylik" ? "Oylik" : "Yillik",
      "Davr": p.period,
      "Holat": p.status === "paid" ? "To'langan" : "Kutilmoqda",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Tarif to'lovlari");
    XLSX.writeFile(wb, "tarif_tolovlari.xlsx");
  };

  const renderPageNumbers = () => {
    const items: React.ReactNode[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    if (start > 1) {
      items.push(<PaginationItem key={1}><PaginationLink onClick={() => setPage(1)}>1</PaginationLink></PaginationItem>);
      if (start > 2) items.push(<PaginationItem key="e1"><PaginationEllipsis /></PaginationItem>);
    }
    for (let i = start; i <= end; i++) {
      items.push(<PaginationItem key={i}><PaginationLink isActive={i === page} onClick={() => setPage(i)}>{i}</PaginationLink></PaginationItem>);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) items.push(<PaginationItem key="e2"><PaginationEllipsis /></PaginationItem>);
      items.push(<PaginationItem key={totalPages}><PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink></PaginationItem>);
    }
    return items;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Tarif rejasi</h1>
        <p className="text-muted-foreground text-sm mt-1">Joriy tarif va to'lovlar tarixi</p>
      </div>

      {/* Current Plan + Payment ID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Info */}
        <Card className="shadow-card lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <Badge className="mb-2">Joriy tarif</Badge>
                <h2 className="font-display text-2xl font-bold text-foreground">{currentPlan.name}</h2>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-foreground">{currentPlan.price}</span>
                  <span className="text-muted-foreground text-sm">so'm / oy</span>
                  <span className="text-muted-foreground text-xs mx-1">yoki</span>
                  <span className="font-display text-xl font-bold text-foreground">{currentPlan.yearlyPrice}</span>
                  <span className="text-muted-foreground text-sm">so'm / yil</span>
                </div>
              </div>
              <div className="text-sm space-y-1 text-right">
                <div className="flex items-center gap-1 justify-end text-muted-foreground">
                  <CalendarDays size={14} />
                  <span>Boshlanish: {currentPlan.startDate}</span>
                </div>
                <div className="flex items-center gap-1 justify-end text-muted-foreground">
                  <CreditCard size={14} />
                  <span>Keyingi to'lov: {currentPlan.nextPayment}</span>
                </div>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentPlan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-emerald-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Payment ID Card */}
        <Card className="shadow-card">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
            <CreditCard size={32} className="text-accent" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">To'lov uchun ID raqam</p>
              <p className="font-display text-2xl font-bold text-foreground tracking-wider">{businessAccountId}</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={copyId}>
              {copied ? <><CheckCircle size={14} /> Nusxalandi</> : <><Copy size={14} /> Nusxalash</>}
            </Button>
            <p className="text-xs text-muted-foreground">
              Ushbu ID raqamni to'lov izohiga yozing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payments History */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-display text-lg font-bold text-foreground">To'lovlar tarixi</h2>
        <Button variant="outline" className="gap-2" onClick={exportToExcel}>
          <Download size={16} /> <span className="hidden sm:inline">Excel</span>
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="rounded-xl border bg-card overflow-hidden hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">№</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Summa</TableHead>
              <TableHead>Turi</TableHead>
              <TableHead>Davr</TableHead>
              <TableHead className="text-center">Holat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell className="text-muted-foreground text-xs">{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                <TableCell className="text-sm">{p.date}</TableCell>
                <TableCell>
                  <span className="font-semibold">{formatSum(p.amount)}</span>
                  <span className="text-xs text-muted-foreground ml-1">so'm</span>
                </TableCell>
                <TableCell>
                  <Badge variant={p.type === "yillik" ? "default" : "secondary"} className="text-xs">
                    {p.type === "yillik" ? "Yillik" : "Oylik"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.period}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    p.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {p.status === "paid" ? <><CheckCircle size={12} /> To'langan</> : <><Clock size={12} /> Kutilmoqda</>}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {paged.map((p) => (
          <div key={p.id} className="rounded-xl border bg-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{p.date}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                p.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {p.status === "paid" ? <><CheckCircle size={12} /> To'langan</> : <><Clock size={12} /> Kutilmoqda</>}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-foreground">{formatSum(p.amount)}</span>
                <span className="text-xs text-muted-foreground ml-1">so'm</span>
              </div>
              <Badge variant={p.type === "yillik" ? "default" : "secondary"} className="text-xs">
                {p.type === "yillik" ? "Yillik" : "Oylik"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{p.period}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default Tariffs;
