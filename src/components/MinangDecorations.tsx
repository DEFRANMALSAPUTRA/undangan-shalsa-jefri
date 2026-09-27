"use client";

import React from "react";

// Gold corner filigree matching reference #2
export function GoldCornerFiligree({
  position,
  className = "w-10 h-10 sm:w-14 sm:h-14",
  color = "#C9A227",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  color?: string;
}) {
  const transform = {
    "top-left": "",
    "top-right": "scale(-1, 1)",
    "bottom-left": "scale(1, -1)",
    "bottom-right": "scale(-1, -1)",
  }[position];

  const posClasses = {
    "top-left": "top-1.5 left-1.5 sm:top-2 sm:left-2",
    "top-right": "top-1.5 right-1.5 sm:top-2 sm:right-2",
    "bottom-left": "bottom-1.5 left-1.5 sm:bottom-2 sm:left-2",
    "bottom-right": "bottom-1.5 right-1.5 sm:bottom-2 sm:right-2",
  }[position];

  return (
    <div
      className={`absolute pointer-events-none z-10 ${posClasses} ${className}`}
      style={{ transform }}
    >
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        {/* Main curved filigree branch */}
        <path
          d="M4 56 C4 30 18 16 56 16 M56 16 C34 16 16 34 16 56 M4 56 C4 18 18 4 56 4"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Inner flourish loops */}
        <path
          d="M8 8 C14 14 20 10 24 6 C28 2 34 8 40 8 M8 8 C14 14 10 20 6 24 C2 28 8 34 8 40"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />
        {/* Leaf / petal accents */}
        <circle cx="10" cy="10" r="2.5" fill={color} />
        <circle cx="26" cy="7" r="1.8" fill={color} />
        <circle cx="7" cy="26" r="1.8" fill={color} />
        <path
          d="M12 12 Q24 24 38 18 Q24 24 18 38"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        {/* Corner leaf cluster */}
        <path
          d="M4 4 C10 8 8 16 4 20 M4 4 C8 10 16 8 20 4"
          stroke={color}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// Gold header crest divider (Reference #2 top)
export function GoldHeaderDivider({ className = "w-40 sm:w-56 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center mx-auto my-2 ${className}`}>
      <svg viewBox="0 0 200 30" fill="none" className="w-full h-full">
        {/* Center crest flower */}
        <path
          d="M100 2 C96 9 92 14 84 15 C92 16 96 21 100 28 C104 21 108 16 116 15 C108 14 104 9 100 2 Z"
          fill="#C9A227"
        />
        <circle cx="100" cy="15" r="2" fill="#FAF0DC" />
        {/* Left side flourish */}
        <path
          d="M84 15 C75 14 68 8 58 10 C48 12 40 20 28 17 C18 14 10 15 2 15"
          stroke="#C9A227"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M68 13 C66 7 58 6 54 11 C50 16 42 16 38 11"
          stroke="#C9A227"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="58" cy="8" r="1.5" fill="#C9A227" />
        <circle cx="38" cy="9" r="1.5" fill="#C9A227" />
        {/* Right side flourish */}
        <path
          d="M116 15 C125 14 132 8 142 10 C152 12 160 20 172 17 C182 14 190 15 198 15"
          stroke="#C9A227"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M132 13 C134 7 142 6 146 11 C150 16 158 16 162 11"
          stroke="#C9A227"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="142" cy="8" r="1.5" fill="#C9A227" />
        <circle cx="162" cy="9" r="1.5" fill="#C9A227" />
      </svg>
    </div>
  );
}

// Gold Minang Rhombus Motif (Reference #2 middle)
export function GoldRhombusMotif({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        {/* Outer diamond */}
        <polygon points="30,2 58,30 30,58 2,30" stroke="#C9A227" strokeWidth="1.5" fill="rgba(201,162,39,0.08)" />
        {/* Inner diamond */}
        <polygon points="30,10 50,30 30,50 10,30" stroke="#C9A227" strokeWidth="1" strokeDasharray="2 2" />
        {/* Center floral element */}
        <circle cx="30" cy="30" r="4" fill="#C9A227" />
        <circle cx="30" cy="20" r="2.5" fill="#C9A227" />
        <circle cx="30" cy="40" r="2.5" fill="#C9A227" />
        <circle cx="20" cy="30" r="2.5" fill="#C9A227" />
        <circle cx="40" cy="30" r="2.5" fill="#C9A227" />
        <path d="M30 14 L30 46 M14 30 L46 30" stroke="#C9A227" strokeWidth="1" />
      </svg>
    </div>
  );
}

// Rumah Gadang Icon for Event Cards (Reference #5)
export function RumahGadangIcon({ className = "w-16 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 55" fill="none" className={className}>
      {/* Curved gonjong roofs */}
      <path
        d="M6 32 C12 24 22 14 30 18 C35 11 40 4 40 4 C40 4 45 11 50 18 C58 14 68 24 74 32 C65 30 52 30 40 31 C28 30 15 30 6 32 Z"
        fill="#540C0C"
        stroke="#C9A227"
        strokeWidth="1.4"
      />
      {/* Gonjong tip spikes */}
      <line x1="6" y1="32" x2="4" y2="28" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="18" x2="28" y2="12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="4" x2="40" y2="0" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="18" x2="52" y2="12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="74" y1="32" x2="76" y2="28" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />

      {/* House Body (Wall) */}
      <rect x="14" y="32" width="52" height="18" fill="#3D0000" stroke="#C9A227" strokeWidth="1.2" />
      {/* Pillars and carved windows */}
      <line x1="22" y1="32" x2="22" y2="50" stroke="#C9A227" strokeWidth="1" />
      <line x1="32" y1="32" x2="32" y2="50" stroke="#C9A227" strokeWidth="1" />
      <line x1="48" y1="32" x2="48" y2="50" stroke="#C9A227" strokeWidth="1" />
      <line x1="58" y1="32" x2="58" y2="50" stroke="#C9A227" strokeWidth="1" />
      {/* Central stairs / entrance */}
      <rect x="36" y="38" width="8" height="12" fill="#C9A227" opacity="0.6" />
      {/* Foundation / stilt level */}
      <rect x="10" y="50" width="60" height="3" fill="#C9A227" rx="1.5" />
    </svg>
  );
}

// Reusable Parchment Card Wrapper with 4 Gold Corner Filigree Ornaments
export function ParchmentCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden p-6 sm:p-10 shadow-card ${className}`}
      style={{
        background: "#FAF0DC",
        border: "1.5px solid #C9A227",
        boxShadow: "0 10px 30px rgba(84, 12, 12, 0.08), 0 1px 3px rgba(201, 162, 39, 0.2)",
        ...style,
      }}
    >
      {/* Inner thin decorative border line */}
      <div
        className="absolute inset-2 sm:inset-3 pointer-events-none rounded-xl"
        style={{ border: "1px solid rgba(201, 162, 39, 0.35)" }}
      />

      {/* 4 Corner filigrees */}
      <GoldCornerFiligree position="top-left" />
      <GoldCornerFiligree position="top-right" />
      <GoldCornerFiligree position="bottom-left" />
      <GoldCornerFiligree position="bottom-right" />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
