import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { id: string; quantity: number };

type CartCtx = {
  items: CartItem[];
  addItem: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
};

const Ctx = createContext<CartCtx>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
  clear: () => {},
  count: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (id: string, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { id, quantity: qty }];
    });
  };
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return <Ctx.Provider value={{ items, addItem, removeItem, updateQty, clear, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
