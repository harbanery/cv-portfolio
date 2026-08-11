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
 * Provider untuk mengatur tampilan avatar di header CV.
 *
 * Mengikuti pola yang sama dengan LocaleProvider & ThemeProvider:
 * state disimpan di module-level variable dengan useSyncExternalStore
 * agar aman terhadap SSR hydration mismatch.
 */

const STORAGE_KEY = "cv-portfolio:avatar";

let clientAvatar = false;
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
  return clientAvatar;
}

function getServerSnapshot(): boolean {
  return false;
}

function readPersisted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function applyAvatar(next: boolean): void {
  clientAvatar = next;
  try {
    localStorage.setItem(STORAGE_KEY, String(next));
  } catch {
    // ignore
  }
  emit();
}

interface AvatarContextValue {
  avatar: boolean;
  hydrated: boolean;
  toggle: () => void;
  setAvatar: (value: boolean) => void;
}

const AvatarContext = createContext<AvatarContextValue>({
  avatar: false,
  hydrated: false,
  toggle: () => {},
  setAvatar: () => {},
});

export function AvatarProvider({ children }: { children: ReactNode }) {
  const avatar = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => clientHydrated,
    () => false,
  );

  useEffect(() => {
    const persisted = readPersisted();
    if (persisted !== clientAvatar) {
      applyAvatar(persisted);
    }
    clientHydrated = true;
    emit();
  }, []);

  const setAvatar = useCallback((next: boolean) => {
    applyAvatar(next);
  }, []);

  const toggle = useCallback(() => {
    applyAvatar(!clientAvatar);
  }, []);

  return (
    <AvatarContext.Provider value={{ avatar, hydrated, toggle, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatarMode(): AvatarContextValue {
  return useContext(AvatarContext);
}
