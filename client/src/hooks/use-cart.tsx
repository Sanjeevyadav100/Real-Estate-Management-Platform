import React, { createContext, useContext, useEffect, useState } from "react";
import { Property } from "@shared/schema";

type CartItem = { property: Property };

type CartContextValue = {
  items: CartItem[];
  add: (p: Property) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "realtyflow_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (p: Property) => {
    setItems((s) => {
      if (s.find((it) => it.property.id === p.id)) return s;
      return [...s, { property: p }];
    });
  };

  const remove = (id: string) => {
    setItems((s) => s.filter((it) => it.property.id !== id));
  };

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export type { CartItem };
