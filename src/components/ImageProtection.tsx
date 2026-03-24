"use client";

import { useEffect } from "react";

function isImageTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("img, picture"));
}

export default function ImageProtection() {
  useEffect(() => {
    const disableImageDragging = () => {
      const images = document.querySelectorAll("img");
      images.forEach((image) => {
        image.setAttribute("draggable", "false");
      });
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (isImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      if (isImageTarget(event.target)) {
        event.preventDefault();
      }
    };

    disableImageDragging();

    const observer = new MutationObserver(() => {
      disableImageDragging();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
    };
  }, []);

  return null;
}
