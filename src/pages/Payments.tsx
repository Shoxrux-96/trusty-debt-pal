import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Download, Eye, CheckCircle } from "lucide-react";
import * as XLSX from "xlsx";
import { usePaidDebts, type PaidDebtEntry } from "@/contexts/PaidDebtsContext";

// Mock data generator for initial payments
const names = [
  "Aziz", "Nilufar", "Sardor", "Madina", "Bobur", "Gulnora", "Jasur", "Dilnoza", "Sherzod", "Kamola",
  "Otabek", "Zulfiya", "Ulug'bek", "Barno", "Eldor", "Sabohat", "Nodir", "Feruza", "Rustam", "Mohira",
  "Jamshid", "Dilorom", "Behruz", "Nasiba", "Sanjar", "Maftuna", "Alisher", "Iroda", "Abbos", "Shoira",
];
const lastNames = [
  "Karimov", "Tosheva", "Aliyev", "Rahimova", "Xasanov", "Saidova", "Mirzayev", "Ergasheva", "Nazarov", "Yusupova",
  "Umarov", "Abdullayeva", "Ismoilov", "Nurullayeva", "Hamidov", "Qodirova", "Salimov", "Tursunova", "Raxmatullayev", "Ahmedova",
];
const itemNames = ["Un 50kg", "Shakar 25kg", "Guruch 10kg", "Yog' 5l", "Paracetamol", "Telefon", "Ko'ylak", "Sement", "Mol go'shti", "Kartoshka"];
const methods: ("Naqd" | "Karta")[] = ["Naqd", "Karta"];

function generateMockPayments(count: number): PaidDebtEntry[] {
  const payments: PaidDebtEntry[] = [];
  for (let i = 1; i <= count; i++) {
    const fn = names[i % names.length];
    const ln = lastNames[i % lastNames.length];
    const itemCount = 1 + (i % 4);
    const items: { name: string; qty: number; price: number }[] = [];
    for (let j = 0; j < itemCount; j++) {
      const price = (((i * 7 + j * 3) % 50) + 5) * 10000;
      items.push({ name: itemNames[(i + j) % itemNames.length], qty: 1 + (j % 5), price });
    }
    const totalDebt = items.reduce((s, it) => s + it.qty * it.price, 0);
    const debtMonth = String(1 + (i % 12)).padStart(2, "0");
    const debtDay = String(1 + (i % 28)).padStart(2, "0");
    const paidMonth = String(1 + ((i + 1) % 12)).padStart(2, "0");
    const paidDay = String(1 + ((i + 3) % 28)).padStart(2, "0");
    payments.push({
      id: 1000 + i,
      firstName: fn, lastName: ln,
      phone: `+998 ${90 + (i % 8)}${i} ${100 + (i % 900)} ${10 + (i % 90)} ${10 + (i % 90)}`,
      debtDate: `2025-${debtMonth}-${debtDay}`,
      paidDate: `2026-${paidMonth}-${paidDay}`,
      totalDebt, items,
      method: methods[i % methods.length],
    });
  }
  return payments;
}

const PAGE_SIZE = 15;

const Payments = () => {
  const { paidDebts } = usePaidDebts();
  const [mockPayments] = useState<PaidDebtEntry[]>(() => generateMockPayments(75));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewPayment, setViewPayment] = useState<PaidDebtEntry | null>(null);

  // Combine context paid debts (from Debtors) with mock data
  const allPayments = useMemo(() => [...paidDebts, ...mockPayments], [paidDebts, mockPayments]);

  const filtered = useMemo(
    () => allPayments.filter((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search)
    ),
    [allPayments, search]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const formatSum = (n: number) => n.toLocaleString("uz-UZ");

  const exportToExcel = () => {
    const data = filtered.map((p) => ({
      "Ism": p.firstName, "Familiya": p.lastName, "Telefon": p.phone,
      "Qarz sanasi": p.debtDate, "To'langan sana": p.paidDate,
      "Summa": p.totalDebt, "Usul": p.method,
      "Olgan narsalar": p.items.map((it) => `${it.name} x${it.qty}`).join(", "),
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "To'lovlar");
    XLSX.writeFile(wb, "tolovlar.xlsx");
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">To'lovlar</h1>
          <p className="text-muted-foreground text-sm mt-1">Qabul qilingan to'lovlar: {filtered.length} ta</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={exportToExcel}>
          <Download size={16} /> <span className="hidden sm:inline">Excel</span>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Ism yoki telefon bo'yicha qidirish..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-10 h-11 rounded-xl"
        />
      </div>

      {/* Desktop Table */}
      <div className="rounded-xl border bg-card overflow-hidden hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">№</TableHead>
              <TableHead>Ism va familiya</TableHead>
              <TableHead className="hidden lg:table-cell">Telefon</TableHead>
              <TableHead>Qarz sanasi</TableHead>
              <TableHead>To'langan sana</TableHead>
              <TableHead>Summa</TableHead>
              <TableHead>Usul</TableHead>
              <TableHead className="w-20 text-center">Holat</TableHead>
              <TableHead className="w-16 text-center">Ko'rish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((p, idx) => (
              <TableRow key={`${p.id}-${idx}`}>
                <TableCell className="text-muted-foreground text-xs">{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                <TableCell className="font-medium">{p.firstName} {p.lastName}</TableCell>
                <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">{p.phone}</TableCell>
                <TableCell className="text-sm">{p.debtDate}</TableCell>
                <TableCell className="text-sm">{p.paidDate}</TableCell>
                <TableCell>
                  <span className="font-semibold">{formatSum(p.totalDebt)}</span>
                  <span className="text-xs text-muted-foreground ml-1">so'm</span>
                </TableCell>
                <TableCell>
                  <Badge variant={p.method === "Naqd" ? "secondary" : "outline"} className="text-xs">
                    {p.method}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <CheckCircle size={12} /> To'langan
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewPayment(p)}><Eye size={15} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {paged.map((p, idx) => (
          <div key={`${p.id}-${idx}`} className="rounded-xl border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-foreground">{p.firstName} {p.lastName}</p>
                <p className="text-sm text-muted-foreground">{p.phone}</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                <CheckCircle size={12} /> To'langan
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-muted-foreground">Qarz: </span>{p.debtDate}
              </div>
              <div>
                <span className="text-muted-foreground">To'landi: </span>{p.paidDate}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-foreground">{formatSum(p.totalDebt)}</span>
                <span className="text-xs text-muted-foreground ml-1">so'm</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={p.method === "Naqd" ? "secondary" : "outline"} className="text-xs">{p.method}</Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewPayment(p)}><Eye size={15} /></Button>
              </div>
            </div>
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

      {/* View Dialog */}
      <Dialog open={!!viewPayment} onOpenChange={() => setViewPayment(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>To'lov ma'lumotlari</DialogTitle></DialogHeader>
          {viewPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Ism:</span> <strong>{viewPayment.firstName} {viewPayment.lastName}</strong></div>
                <div><span className="text-muted-foreground">Telefon:</span> {viewPayment.phone}</div>
                <div><span className="text-muted-foreground">Qarz sanasi:</span> {viewPayment.debtDate}</div>
                <div><span className="text-muted-foreground">To'langan:</span> {viewPayment.paidDate}</div>
                <div><span className="text-muted-foreground">Usul:</span> <Badge variant="secondary">{viewPayment.method}</Badge></div>
                <div><span className="text-muted-foreground">Jami:</span> <strong>{formatSum(viewPayment.totalDebt)} so'm</strong></div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Olgan narsalar:</p>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Nomi</TableHead><TableHead>Soni</TableHead><TableHead>Narxi</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewPayment.items.map((it, i) => (
                        <TableRow key={i}>
                          <TableCell>{it.name}</TableCell>
                          <TableCell>{it.qty}</TableCell>
                          <TableCell>{formatSum(it.price)} so'm</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;
