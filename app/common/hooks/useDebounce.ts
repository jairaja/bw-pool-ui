import React, { useEffect } from "react";

export default function useDebounce(fn: () => unknown, timeout: number) {
  useEffect(() => {
    const handle = setTimeout(fn, timeout);

    return () => {
      clearTimeout(handle);
    };
  }, [fn, timeout]);
}
