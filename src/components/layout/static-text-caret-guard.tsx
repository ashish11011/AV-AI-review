"use client";

import { useEffect } from "react";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  "[contenteditable='true']",
  "[role='button']",
  "[role='link']",
].join(",");

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(interactiveSelector));
}

export function StaticTextCaretGuard() {
  useEffect(() => {
    function clearStaticSelection() {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return;
      }

      document.getSelection()?.removeAllRanges();
    }

    function handlePointerDown(event: PointerEvent) {
      if (isInteractiveTarget(event.target)) {
        return;
      }

      event.preventDefault();
      clearStaticSelection();
    }

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("selectionchange", clearStaticSelection);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("selectionchange", clearStaticSelection);
    };
  }, []);

  return null;
}
