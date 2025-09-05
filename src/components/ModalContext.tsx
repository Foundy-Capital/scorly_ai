'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isPaywallOpen: boolean;
  openPaywall: () => void;
  closePaywall: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  const openPaywall = () => setIsPaywallOpen(true);
  const closePaywall = () => setIsPaywallOpen(false);

  return (
    <ModalContext.Provider value={{ isPaywallOpen, openPaywall, closePaywall }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}