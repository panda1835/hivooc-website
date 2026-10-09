"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      );
      const scrollableHeight = documentHeight - window.innerHeight;
      setIsVisible(
        scrollableHeight > 0 && window.scrollY >= scrollableHeight / 4,
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-10 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-branding-green text-white shadow-lg transition-colors hover:bg-branding-green/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
