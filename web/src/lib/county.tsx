import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { isCounty, type County } from "./counties";

// The chosen county is the only thing Waypoint saves.
const STORAGE_KEY = "waypoint.county";

function readStored(): County | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isCounty(value) ? value : null;
  } catch {
    return null;
  }
}

function writeStored(county: County): void {
  try {
    localStorage.setItem(STORAGE_KEY, county);
  } catch {
    // Private mode or blocked storage: the county just won't be remembered.
  }
}

interface CountyState {
  county: County | null;
  picking: boolean;
  setCounty: (county: County) => void;
  startPicking: () => void;
  stopPicking: () => void;
}

const CountyContext = createContext<CountyState | null>(null);

export function CountyProvider({ children }: { children: ReactNode }) {
  const [county, setCountyState] = useState<County | null>(readStored);
  const [picking, setPicking] = useState(false);

  const setCounty = useCallback((next: County) => {
    setCountyState(next);
    setPicking(false);
    writeStored(next);
    window.scrollTo(0, 0);
  }, []);
  const startPicking = useCallback(() => setPicking(true), []);
  const stopPicking = useCallback(() => setPicking(false), []);

  const value = useMemo(
    () => ({ county, picking, setCounty, startPicking, stopPicking }),
    [county, picking, setCounty, startPicking, stopPicking],
  );
  return <CountyContext.Provider value={value}>{children}</CountyContext.Provider>;
}

export function useCounty(): CountyState {
  const state = useContext(CountyContext);
  if (!state) throw new Error("useCounty must be used inside CountyProvider");
  return state;
}
