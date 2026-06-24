"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch-only devices on mount. If touch, render nothing and bail —
  // a custom cursor on a touchscreen just sits in the middle of the screen
  // doing nothing useful.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top  = e.clientY  + "px";
    };

    const enter = () => cursor.classList.add("hovered");
    const leave = () => cursor.classList.remove("hovered");

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return <div id="custom-cursor" />;
}
