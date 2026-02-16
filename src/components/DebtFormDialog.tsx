import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export interface DebtItem {
  name: string;
  qty: number;
  price: number;
}

export interface DebtFormData {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  debtDate: string;
  items: DebtItem[];
}

interface DebtFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: DebtFormData | null;
  onSave: (data: DebtFormData) => void;
  title: string;
}

const emptyItem = (): DebtItem => ({ name: "", qty: 1, price: 0 });

const DebtFormDialog = ({ open, onOpenChange, initialData, onSave, title }: DebtFormDialogProps) => {
  const [form, setForm] = useState<DebtFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    debtDate: new Date().toISOString().slice(0, 10),
    items: [emptyItem()],
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({ ...initialData, items: initialData.items.map((it) => ({ ...it })) });
      } else {
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          debtDate: new Date().toISOString().slice(0, 10),
          items: [emptyItem()],
        });
      }
    }
  }, [open, initialData]);

  const updateItem = (index: number, field: keyof DebtItem, value: string | number) => {
    const items = [...form.items];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, emptyItem()] });
  };

  const removeItem = (index: number) => {
    if (form.items.length <= 1) return;
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const totalDebt = form.items.reduce((s, it) => s + it.qty * it.price, 0);

  const handleSave = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Ism</Label>
              <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="Ism" />
            </div>
            <div>
              <Label>Familiya</Label>
              <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Familiya" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+998 XX XXX XX XX" />
            </div>
            <div>
              <Label>Qarz sanasi</Label>
              <Input type="date" value={form.debtDate} onChange={(e) => setForm({ ...form, debtDate: e.target.value })} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Olgan narsalar</Label>
              <Button type="button" variant="outline" size="sm" className="gap-1 h-8" onClick={addItem}>
                <Plus size={14} /> Qo'shish
              </Button>
            </div>
            <div className="space-y-2">
              {form.items.map((it, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <Input
                    className="flex-1"
                    value={it.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                    placeholder="Nomi"
                  />
                  <Input
                    className="w-16 sm:w-20"
                    type="number"
                    min={1}
                    value={it.qty}
                    onChange={(e) => updateItem(i, "qty", +e.target.value)}
                    placeholder="Soni"
                  />
                  <Input
                    className="w-24 sm:w-28"
                    type="number"
                    min={0}
                    value={it.price}
                    onChange={(e) => updateItem(i, "price", +e.target.value)}
                    placeholder="Narxi"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-destructive hover:text-destructive"
                    onClick={() => removeItem(i)}
                    disabled={form.items.length <= 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-sm">
            Jami: <strong>{totalDebt.toLocaleString("uz-UZ")} so'm</strong>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Bekor qilish</Button>
          <Button onClick={handleSave}>Saqlash</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DebtFormDialog;
