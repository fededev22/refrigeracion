"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { services } from "@/lib/config";

type AppState = {
  temp: number;
  setTemp: (value: number) => void;
  serviceId: string;
  setServiceId: (id: string) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [temp, setTemp] = useState(20);
  const [serviceId, setServiceId] = useState<string>(services[0].id);

  useLayoutEffect(() => {
    const heat = (temp - 16) / 16;
    document.documentElement.style.setProperty("--heat", heat.toFixed(3));
  }, [temp]);

  return (
    <AppContext.Provider value={{ temp, setTemp, serviceId, setServiceId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useAppState debe usarse dentro de AppStateProvider");
  return value;
}
