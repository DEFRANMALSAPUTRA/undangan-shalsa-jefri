"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";

export default function QuoteSection() {
  return (
    <section id="kutipan" className="section-dark py-14 px-4 text-center relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "repeating-linear-gradient(45deg,#C9A227 0px,#C9A227 2px,transparent 2px,transparent 18px),repeating-linear-gradient(-45deg,#C9A227 0px,#C9A227 2px,transparent 2px,transparent 18px)"
      }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <ScrollReveal animation="scale-up" threshold={0.2}>
          {/* Floral ornament */}
          <div className="flex justify-center mb-4">
            <Image src="/minang-floral-ornament.jpg" alt="" width={100} height={50}
              className="object-contain opacity-80"
              style={{ filter: "invert(1) sepia(1) saturate(2) hue-rotate(10deg)" }} />
          </div>

          {/* Double border card */}
          <div className="relative p-8 sm:p-10 rounded mx-auto"
            style={{ border: "1px solid rgba(201,162,39,0.5)", background: "rgba(45,5,5,0.6)" }}>
            <div className="absolute inset-2 rounded pointer-events-none" style={{ border: "1px solid rgba(201,162,39,0.2)" }} />

            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 text-minang-400/40 text-xl">◆</div>
            <div className="absolute top-2 right-2 text-minang-400/40 text-xl">◆</div>
            <div className="absolute bottom-2 left-2 text-minang-400/40 text-xl">◆</div>
            <div className="absolute bottom-2 right-2 text-minang-400/40 text-xl">◆</div>

            {/* Arabic */}
            <p className="font-serif text-xl sm:text-2xl leading-loose mb-4 font-medium"
              style={{ color: "#E5C06E", direction: "rtl" }}>
              {weddingData.quote.arabic}
            </p>

            {/* Divider */}
            <div className="ornament-divider my-4">
              <span style={{ color: "#C9A227" }}>❋</span>
            </div>

            {/* Translation */}
            <p className="text-sm italic font-serif leading-relaxed" style={{ color: "rgba(253,248,239,0.8)" }}>
              &ldquo;{weddingData.quote.translation}&rdquo;
            </p>

            <p className="text-xs font-semibold mt-4 px-4 py-1 inline-block rounded-full"
              style={{ color: "#C9A227", border: "1px solid rgba(201,162,39,0.4)", background: "rgba(201,162,39,0.1)" }}>
              {weddingData.quote.source}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
