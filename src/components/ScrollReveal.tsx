"use client";

import React, { useEffect, useRef, ReactNode } from "react";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "scale-up"
  | "scale-down"
  | "rotate-in"
  | "flip-x"
  | "zoom-in";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;        // ms
  duration?: number;     // ms
  threshold?: number;    // 0 - 1
  className?: string;
  once?: boolean;        // if true, animate only once (no reverse on scroll up)
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden styles
    el.style.transitionDuration = `${duration}ms`;
    el.style.transitionTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transitionProperty = "opacity, transform";
    el.style.transitionDelay = `${delay}ms`;

    // Apply initial hidden transform
    applyHiddenState(el, animation);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal
          el.style.opacity = "1";
          el.style.transform = "translate3d(0,0,0) scale(1) rotateX(0deg)";
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          // Hide again (for bidirectional scroll)
          applyHiddenState(el, animation);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration, threshold, once]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </Tag>
  );
}

function applyHiddenState(el: HTMLElement, animation: RevealAnimation) {
  el.style.opacity = "0";
  switch (animation) {
    case "fade-up":
      el.style.transform = "translate3d(0, 40px, 0)";
      break;
    case "fade-down":
      el.style.transform = "translate3d(0, -40px, 0)";
      break;
    case "fade-left":
      el.style.transform = "translate3d(50px, 0, 0)";
      break;
    case "fade-right":
      el.style.transform = "translate3d(-50px, 0, 0)";
      break;
    case "scale-up":
      el.style.transform = "translate3d(0,0,0) scale(0.82)";
      break;
    case "scale-down":
      el.style.transform = "translate3d(0,0,0) scale(1.12)";
      break;
    case "rotate-in":
      el.style.transform = "translate3d(0, 30px, 0) rotate(-6deg)";
      break;
    case "flip-x":
      el.style.transform = "translate3d(0,0,0) rotateX(60deg)";
      break;
    case "zoom-in":
      el.style.transform = "translate3d(0, 20px, 0) scale(0.9)";
      break;
    case "fade-in":
    default:
      el.style.transform = "translate3d(0,0,0)";
      break;
  }
}
