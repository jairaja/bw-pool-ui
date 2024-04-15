import React, { useEffect } from "react";

export function useDebounce(fn: () => unknown, timeout: number) {
  useEffect(() => {
    const handle = setTimeout(fn, timeout);

    return () => {
      clearTimeout(handle);
    };
  }, [fn, timeout]);
}
