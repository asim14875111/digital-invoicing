import { useEffect } from "react";

export default function useOnClickOutside<El extends HTMLElement = HTMLElement>(
  ref: React.RefObject<El | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el) return;
      if (event.target && el.contains(event.target as Node)) return;
      handler(event);
    };

  document.addEventListener("mousedown", listener);
  document.addEventListener("touchstart", listener);
  document.addEventListener("click", listener);

    return () => {
  document.removeEventListener("mousedown", listener);
  document.removeEventListener("touchstart", listener);
  document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
