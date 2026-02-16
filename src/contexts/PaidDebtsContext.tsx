import { createContext, useContext, useState, ReactNode } from "react";

export interface PaidDebtEntry {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  debtDate: string;
  paidDate: string;
  totalDebt: number;
  items: { name: string; qty: number; price: number }[];
  method: "Naqd" | "Karta";
}

interface PaidDebtsContextType {
  paidDebts: PaidDebtEntry[];
  addPaidDebt: (debt: PaidDebtEntry) => void;
}

const PaidDebtsContext = createContext<PaidDebtsContextType | null>(null);

export const usePaidDebts = () => {
  const ctx = useContext(PaidDebtsContext);
  if (!ctx) throw new Error("usePaidDebts must be used within PaidDebtsProvider");
  return ctx;
};

export const PaidDebtsProvider = ({ children }: { children: ReactNode }) => {
  const [paidDebts, setPaidDebts] = useState<PaidDebtEntry[]>([]);

  const addPaidDebt = (debt: PaidDebtEntry) => {
    setPaidDebts((prev) => [debt, ...prev]);
  };

  return (
    <PaidDebtsContext.Provider value={{ paidDebts, addPaidDebt }}>
      {children}
    </PaidDebtsContext.Provider>
  );
};
