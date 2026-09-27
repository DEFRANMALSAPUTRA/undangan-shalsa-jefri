"use client";

import React, { useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { MailOpen, Heart } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface CoverEnvelopeProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function CoverEnvelope({ guestName, isOpen, onOpen }: CoverEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ["#C9A227", "#E5C06E", "#7B1A1A", "#C0392B", "#FAF0DC"] });
    } catch { /* ignore */ }
    setTimeout(() => onOpen(), 700);
  };

  if (isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 ease-in-out ${isOpening ? "-translate-y-full opacity-0 pointer-events-none" : ""}`}
      style={{ background: "linear-gradient(160deg, #2D0505 0%, #4A0A0A 50%, #7B1A1A 100%)" }}>

      {/* BG photo */}
      <div className="absolute inset-0">
        <Image src="/bg-rumah-gadang.jpg" alt="Rumah Gadang" fill className="object-cover opacity-35 object-top" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(45,5,5,0.7),rgba(74,10,10,0.88))" }} />
      </div>

      {/* Ornament border top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden opacity-50">
        <Image src="/minang-ornament-border.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2D0505]" />
      </div>

      {/* Corner borders */}
      {["top-4 left-4 border-t-2 border-l-2", "top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2", "bottom-4 right-4 border-b-2 border-r-2"].map((cls, i) => (
        <div key={i} className={`absolute w-12 h-12 ${cls}`} style={{ borderColor: "rgba(201,162,39,0.6)" }} />
      ))}

      {/* Main card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="rounded text-center overflow-hidden"
          style={{ background: "rgba(45,5,5,0.9)", border: "1px solid rgba(201,162,39,0.5)", boxShadow: "0 0 60px rgba(201,162,39,0.2),0 30px 60px rgba(0,0,0,0.5)" }}>

          {/* Tiga warna top bar */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#1A4A2E 0%,#C9A227 33%,#7B1A1A 66%,#C9A227 100%)" }} />

          <div className="p-8">
            {/* Top ornament */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,rgba(201,162,39,0.7))" }} />
              <span style={{ color: "#C9A227", fontSize: "1.1rem" }}>❋</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,rgba(201,162,39,0.7),transparent)" }} />
            </div>

            <p className="text-[10px] uppercase tracking-[0.4em] mb-0.5" style={{ color: "#C9A227" }}>Baralek Gadang</p>
            <p className="text-[9px] uppercase tracking-[0.3em] mb-4" style={{ color: "rgba(201,162,39,0.6)" }}>Walimatul Ursy</p>

            {/* Names */}
            <h1 style={{
              fontFamily: "var(--font-cormorant),Georgia,serif",
              fontStyle: "italic",
              fontSize: "clamp(3rem,10vw,4rem)",
              color: "#E5C06E",
              lineHeight: 1.05,
              textShadow: "0 4px 20px rgba(201,162,39,0.4)",
            }}>
              {weddingData.bride.name.split(" ")[0]}
              <br />
              <span style={{ fontSize: "0.5em", color: "#FAF0DC", fontStyle: "normal" }}>&amp;</span>
              <br />
              {weddingData.groom.name.split(" ")[0]}
            </h1>

            {/* Date */}
            <div className="mt-4 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider"
              style={{ color: "#E5C06E", border: "1px solid rgba(201,162,39,0.3)", background: "rgba(201,162,39,0.08)" }}>
              <span className="font-bold">09 . 10 . 2026</span>
              <span style={{ color: "#C9A227" }}>•</span>
              <span>Pantai Torpedo Ujung Labung, Sumatera Barat</span>
            </div>



            {/* CTA button */}
            <button onClick={handleOpen}
              className="btn-gold w-full rounded-full"
              style={{ borderRadius: "24px", gap: "0.5rem", fontSize: "0.8rem" }}>
              <MailOpen className="w-4 h-4" />
              Buka Undangan
              <Heart className="w-3.5 h-3.5 fill-current" style={{ color: "#7B1A1A" }} />
            </button>
          </div>

          {/* Tiga warna bottom bar */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg,#C9A227 0%,#7B1A1A 33%,#C9A227 66%,#1A4A2E 100%)" }} />
        </div>
      </div>

      {/* Ornament border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-50">
        <Image src="/minang-ornament-border.jpg" alt="" fill className="object-cover scale-y-[-1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D0505] to-transparent" />
      </div>
    </div>
  );
}
