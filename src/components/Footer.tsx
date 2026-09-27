"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard } from "@/components/MinangDecorations";
import { weddingData } from "@/data/weddingData";

export default function Footer() {
  return (
    <footer
      className="py-16 px-4 relative overflow-hidden text-center"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          {/* Parchment Card matching Reference #10 */}
          <ParchmentCard className="text-center py-10 px-6 sm:px-12">
            {/* Title */}
            <h2
              className="font-serif italic text-2xl sm:text-3xl mb-4"
              style={{ color: "#540C0C" }}
            >
              Terima Kasih
            </h2>

            {/* Content text */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md mx-auto mb-4">
              Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan
              memberikan doa restu kepada kami.
            </p>

            <p
              className="font-serif italic text-xs sm:text-sm mb-6"
              style={{ color: "#540C0C" }}
            >
              Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>

            {/* Couple Signature Name */}
            <h3
              className="font-serif italic text-3xl sm:text-4xl font-normal"
              style={{
                color: "#540C0C",
                textShadow: "0 1px 2px rgba(201,162,39,0.3)",
              }}
            >
              {weddingData.bride.name} &amp; {weddingData.groom.name}
            </h3>
          </ParchmentCard>
        </ScrollReveal>

        <p className="text-[11px] text-gray-500 mt-8">
          The Wedding of {weddingData.bride.name} &amp; {weddingData.groom.name} • 09.10.2026 • Tanjung Mutiara, Agam, Sumatera Barat
        </p>
      </div>
    </footer>
  );
}
