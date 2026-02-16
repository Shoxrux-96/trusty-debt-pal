import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis
} from "@/components/ui/pagination";
import { Search, Plus, Download, Eye, Pencil, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";

interface DebtItem {
  name: string;
  qty: number;
  price: number;
}

interface Debtor {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  debtDate: string;
  totalDebt: number;
  items: DebtItem[];
  paid: boolean;
}

const names = [
  "Aziz", "Nilufar", "Sardor", "Madina", "Bobur", "Gulnora", "Jasur", "Dilnoza", "Sherzod", "Kamola",
  "Otabek", "Zulfiya", "Ulug'bek", "Barno", "Eldor", "Sabohat", "Nodir", "Feruza", "Rustam", "Mohira",
  "Jamshid", "Dilorom", "Behruz", "Nasiba", "Sanjar", "Maftuna", "Alisher", "Iroda", "Abbos", "Shoira",
];
const lastNames = [
  "Karimov", "Tosheva", "Aliyev", "Rahimova", "Xasanov", "Saidova", "Mirzayev", "Ergasheva", "Nazarov", "Yusupova",
  "Umarov", "Abdullayeva", "Ismoilov", "Nurullayeva", "Hamidov", "Qodirova", "Salimov", "Tursunova", "Raxmatullayev", "Ahmedova",
];
const businesses = ["Oziq-ovqat", "Apteka", "Elektronika", "Kiyim", "Qurilish", "Go'sht", "Sabzavot", "Texnika", "Mebel", "Avtoehtiyot"];
const itemNames = ["Un 50kg", "Shakar 25kg", "Guruch 10kg", "Yog' 5l", "Paracetamol", "Telefon", "Ko'ylak", "Sement", "Mol go'shti", "Kartoshka"];

function generateMockDebtors(count: number): Debtor[] {
  const debtors: Debtor[] = [];
  for (let i = 1; i <= count; i++) {
    const fn = names[i % names.length];
    const ln = lastNames[i % lastNames.length];
    const itemCount = 1 + (i % 4);
    const items: DebtItem[] = [];
    for (let j = 0; j < itemCount; j++) {
      const price = (((i * 7 + j * 3) % 50) + 5) * 10000;
      items.push({ name: itemNames[(i + j) % itemNames.length], qty: 1 + (j % 5), price });
    }
    const totalDebt = items.reduce((s, it) => s + it.qty * it.price, 0);
    const month = String(1 + (i % 12)).padStart(2, "0");
    const day = String(1 + (i % 28)).padStart(2, "0");
    debtors.push({
      id: i,
      firstName: fn,
      lastName: ln,
      phone: `+998 ${90 + (i % 8)}${i} ${100 + (i % 900)} ${10 + (i % 90)} ${10 + (i % 90)}`,
      debtDate: `2025-${month}-${day}`,
      totalDebt,
      items,
      paid: false,
    });
  }
  return debtors;
}

const PAGE_SIZE = 15;

const Debtors = () => {
  const [debtors, setDebtors] = useState<Debtor[]>(() => generateMockDebtors(75));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewDebtor, setViewDebtor] = useState<Debtor | null>(null);
  const [editDebtor, setEditDebtor] = useState<Debtor | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Debtor | null>(null);

  const filtered = useMemo(
    () =>
      debtors.filter(
        (d) =>
          `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
          d.phone.includes(search)
      ),
    [debtors, search]
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const togglePaid = (id: number, checked: boolean) => {
    setDebtors((prev) => prev.map((d) => (d.id === id ? { ...d, paid: checked } : d)));
  };

  const handleDelete = (id: number) => {
    setDebtors((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
  };

  const handleEditSave = () => {
    if (!editDebtor) return;
    setDebtors((prev) => prev.map((d) => (d.id === editDebtor.id ? editDebtor : d)));
    setEditDebtor(null);
  };

  const exportToExcel = () => {
    const data = filtered.map((d) => ({
      "Ism": d.firstName,
      "Familiya": d.lastName,
      "Telefon": d.phone,
      "Qarz sanasi": d.debtDate,
      "Umumiy qarz": d.totalDebt,
      "Olgan narsalar": d.items.map((it) => `${it.name} x${it.qty}`).join(", "),
      "Holati": d.paid ? "To'langan" : "Qarz",
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Qarz oluvchilar");
    XLSX.writeFile(wb, "qarz_oluvchilar.xlsx");
  };

  const formatSum = (n: number) => n.toLocaleString("uz-UZ");

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
      items.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === page} onClick={() => setPage(i)}>{i}</PaginationLink>
        </PaginationItem>
      );
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
          <h1 className="font-display text-2xl font-bold text-foreground">Qarz oluvchilar</h1>
          <p className="text-muted-foreground text-sm mt-1">Jami: {filtered.length} ta</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={exportToExcel}>
            <Download size={16} /> Excel
          </Button>
          <Button variant="hero" className="gap-2">
            <Plus size={16} /> Yangi qarz
          </Button>
        </div>
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

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10">№</TableHead>
              <TableHead>Ism va familiya</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Qarz summasi</TableHead>
              <TableHead>Olgan narsalar</TableHead>
              <TableHead className="w-24 text-center">To'landi</TableHead>
              <TableHead className="w-28 text-center">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((debtor, idx) => (
              <TableRow key={debtor.id} className={debtor.paid ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""}>
                <TableCell className="text-muted-foreground text-xs">{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                <TableCell className="font-medium">{debtor.firstName} {debtor.lastName}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{debtor.phone}</TableCell>
                <TableCell className="text-sm">{debtor.debtDate}</TableCell>
                <TableCell>
                  <span className="font-semibold">{formatSum(debtor.totalDebt)}</span>
                  <span className="text-xs text-muted-foreground ml-1">so'm</span>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="flex flex-wrap gap-1">
                    {debtor.items.slice(0, 2).map((it, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{it.name} x{it.qty}</Badge>
                    ))}
                    {debtor.items.length > 2 && (
                      <Badge variant="outline" className="text-xs">+{debtor.items.length - 2}</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={debtor.paid}
                    onCheckedChange={(checked) => togglePaid(debtor.id, !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewDebtor(debtor)}>
                      <Eye size={15} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditDebtor({ ...debtor, items: [...debtor.items] })}>
                      <Pencil size={15} />
                    </Button>
                    {debtor.paid && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteConfirm(debtor)}>
                        <Trash2 size={15} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      <Dialog open={!!viewDebtor} onOpenChange={() => setViewDebtor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Qarz ma'lumotlari</DialogTitle>
          </DialogHeader>
          {viewDebtor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Ism:</span> <strong>{viewDebtor.firstName} {viewDebtor.lastName}</strong></div>
                <div><span className="text-muted-foreground">Telefon:</span> {viewDebtor.phone}</div>
                <div><span className="text-muted-foreground">Sana:</span> {viewDebtor.debtDate}</div>
                <div><span className="text-muted-foreground">Jami:</span> <strong>{formatSum(viewDebtor.totalDebt)} so'm</strong></div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Olgan narsalar:</p>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Nomi</TableHead><TableHead>Soni</TableHead><TableHead>Narxi</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewDebtor.items.map((it, i) => (
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
              <Badge variant={viewDebtor.paid ? "default" : "destructive"}>
                {viewDebtor.paid ? "To'langan" : "Qarz mavjud"}
              </Badge>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editDebtor} onOpenChange={() => setEditDebtor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tahrirlash</DialogTitle>
          </DialogHeader>
          {editDebtor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Ism</Label><Input value={editDebtor.firstName} onChange={(e) => setEditDebtor({ ...editDebtor, firstName: e.target.value })} /></div>
                <div><Label>Familiya</Label><Input value={editDebtor.lastName} onChange={(e) => setEditDebtor({ ...editDebtor, lastName: e.target.value })} /></div>
              </div>
              <div><Label>Telefon</Label><Input value={editDebtor.phone} onChange={(e) => setEditDebtor({ ...editDebtor, phone: e.target.value })} /></div>
              <div><Label>Qarz sanasi</Label><Input type="date" value={editDebtor.debtDate} onChange={(e) => setEditDebtor({ ...editDebtor, debtDate: e.target.value })} /></div>
              <div>
                <Label>Olgan narsalar</Label>
                {editDebtor.items.map((it, i) => (
                  <div key={i} className="flex gap-2 mt-2">
                    <Input className="flex-1" value={it.name} onChange={(e) => { const items = [...editDebtor.items]; items[i] = { ...items[i], name: e.target.value }; setEditDebtor({ ...editDebtor, items }); }} placeholder="Nomi" />
                    <Input className="w-16" type="number" value={it.qty} onChange={(e) => { const items = [...editDebtor.items]; items[i] = { ...items[i], qty: +e.target.value }; setEditDebtor({ ...editDebtor, items }); }} />
                    <Input className="w-28" type="number" value={it.price} onChange={(e) => { const items = [...editDebtor.items]; items[i] = { ...items[i], price: +e.target.value }; setEditDebtor({ ...editDebtor, items }); }} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDebtor(null)}>Bekor qilish</Button>
            <Button onClick={handleEditSave}>Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>O'chirishni tasdiqlang</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            <strong>{deleteConfirm?.firstName} {deleteConfirm?.lastName}</strong> ni jadvaldan o'chirmoqchimisiz?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Yo'q</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm.id)}>Ha, o'chirish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Debtors;
