import { useCallback, useEffect, useRef, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    cancel();

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return cancel;
  }, [value, delay, cancel]);

  return [debouncedValue, cancel] as const;
}
