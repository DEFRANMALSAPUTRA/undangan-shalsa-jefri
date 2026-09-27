"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate petals only on client to avoid hydration mismatch
    const generated: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      animationDuration: 8 + Math.random() * 10, // 8-18s
      animationDelay: Math.random() * 8, // 0-8s
      size: 10 + Math.random() * 14, // 10-24px
      opacity: 0.25 + Math.random() * 0.45,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            opacity: petal.opacity,
          }}
        >
          {/* SVG Rose Petal */}
          <svg
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-rose-300 drop-shadow-sm"
          >
            <path
              d="M15 2C8 2 2 10 2 18C2 24.5 7.5 28 15 28C22.5 28 28 24.5 28 18C28 10 22 2 15 2Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
            <path
              d="M15 6C11 6 6 12 6 18C6 22 10 25 15 25C20 25 24 22 24 18C24 12 19 6 15 6Z"
              fill="#EAC2BC"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
