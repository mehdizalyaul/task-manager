import { createContext, useState } from "react";
import { Spinner } from "../components";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {loading && <Spinner />}
      {children}
    </LoadingContext.Provider>
  );
}
