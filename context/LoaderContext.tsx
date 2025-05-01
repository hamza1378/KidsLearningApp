// context/LoaderContext.tsx
import React, { createContext, useContext, useState, useRef } from "react";
import { AnimatedLoader } from "@/components/AnimatedLoader";

const LoaderContext = createContext({
  showLoader: (timeout?: number) => {},
  hideLoader: () => {},
});

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showLoader = (timeout = 10000) => {
    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.warn("Loader auto-hidden after timeout.");
      setLoading(false);
    }, timeout);
  };

  const hideLoader = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {loading && <AnimatedLoader />}
      {children}
    </LoaderContext.Provider>
  );
};
