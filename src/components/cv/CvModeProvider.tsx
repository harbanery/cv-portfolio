"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Provider untuk mengatur tampilan "CV mode".
 *
 * - CV mode ON  → layout dokumen CV sempit (seperti resume, max 850px).
 * - CV mode OFF → layout website yang melebar menyesuaikan resolusi layar.
 *
 * Mengikuti pola yang sama dengan LocaleProvider & ThemeProvider:
 * state disimpan di module-level variable dengan useSyncExternalStore
 * agar aman terhadap SSR hydration mismatch.
 */

const STORAGE_KEY = "cv-portfolio:cv-mode";

let clientCvMode = true;
let clientHydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): boolean {
  return clientCvMode;
}

function getServerSnapshot(): boolean {
  return true;
}

function readPersisted(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true" || stored === "false") return stored === "true";
  } catch {
    // ignore
  }
  return true;
}

function applyCvMode(next: boolean): void {
  clientCvMode = next;
  try {
    localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // ignore
  }
  emit();
}

interface CvModeContextValue {
  cvMode: boolean;
  hydrated: boolean;
  toggle: () => void;
  setCvMode: (value: boolean) => void;
}

const CvModeContext = createContext<CvModeContextValue>({
  cvMode: true,
  hydrated: false,
  toggle: () => {},
  setCvMode: () => {},
});

export function CvModeProvider({ children }: { children: ReactNode }) {
  const cvMode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => clientHydrated,
    () => false,
  );

  useEffect(() => {
    const persisted = readPersisted();
    if (persisted !== clientCvMode) {
      applyCvMode(persisted);
    }
    clientHydrated = true;
    emit();
  }, []);

  const setCvMode = useCallback((next: boolean) => {
    applyCvMode(next);
  }, []);

  const toggle = useCallback(() => {
    applyCvMode(!clientCvMode);
  }, []);

  return (
    <CvModeContext.Provider value={{ cvMode, hydrated, toggle, setCvMode }}>
      {children}
    </CvModeContext.Provider>
  );
}

export function useCvMode(): CvModeContextValue {
  return useContext(CvModeContext);
}
