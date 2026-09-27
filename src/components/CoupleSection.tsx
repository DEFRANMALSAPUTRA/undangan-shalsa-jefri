"use client";

import React from "react";
import Image from "next/image";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard, GoldRhombusMotif } from "@/components/MinangDecorations";

function ArchFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-32 h-44 sm:w-44 sm:h-60 mx-auto">
      {/* Gold arch frame matching reference */}
      <div
        className="absolute inset-0 rounded-t-[50%] rounded-b-md border-2 overflow-hidden"
        style={{
          borderColor: "#C9A227",
          boxShadow: "0 8px 24px rgba(84,12,12,0.15)",
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,6,6,0.25)] to-transparent pointer-events-none" />
      </div>

      {/* Little bottom gold accent */}
      <div
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10"
        style={{
          background: "linear-gradient(135deg, #B58A18, #F5DC88)",
          border: "2px solid #FAF0DC",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <span className="text-[#3D0000] text-[9px] font-bold">❋</span>
      </div>
    </div>
  );
}

export default function CoupleSection() {
  return (
    <section
      id="mempelai"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          <ParchmentCard className="text-center py-10 px-4 sm:px-12">
            {/* Title: Mempelai */}
            <h2
              className="font-serif italic text-3xl sm:text-4xl mb-8"
              style={{
                color: "#540C0C",
                textShadow: "0 1px 2px rgba(201,162,39,0.2)",
              }}
            >
              Mempelai
            </h2>

            {/* Couple grid: Bride - Motif - Groom */}
            <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-4 sm:gap-2 max-w-xl mx-auto mb-8">
              {/* Bride (Wanita Didahulukan) */}
              <div className="sm:col-span-3 text-center">
                <ArchFrame
                  src={weddingData.bride.photo}
                  alt={weddingData.bride.fullName}
                />
                <div className="mt-5">
                  <h3
                    className="font-serif font-bold text-lg sm:text-xl"
                    style={{ color: "#3D0000" }}
                  >
                    {weddingData.bride.fullName}
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: "#7B1A1A" }}>
                    Putri tercinta dari
                  </p>
                  <p className="text-xs leading-relaxed text-gray-700 mt-0.5">
                    Bapak {weddingData.bride.father} &amp; Ibu {weddingData.bride.mother}
                  </p>
                </div>
              </div>

              {/* Center Motif (Minang Rhombus) */}
              <div className="sm:col-span-1 flex justify-center py-2 sm:py-0">
                <GoldRhombusMotif className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              {/* Groom */}
              <div className="sm:col-span-3 text-center">
                <ArchFrame
                  src={weddingData.groom.photo}
                  alt={weddingData.groom.fullName}
                />
                <div className="mt-5">
                  <h3
                    className="font-serif font-bold text-lg sm:text-xl"
                    style={{ color: "#3D0000" }}
                  >
                    {weddingData.groom.fullName}
                  </h3>
                  <p className="text-xs mt-1 font-medium" style={{ color: "#7B1A1A" }}>
                    Putra tercinta dari
                  </p>
                  <p className="text-xs leading-relaxed text-gray-700 mt-0.5">
                    {weddingData.groom.father} &amp; {weddingData.groom.mother}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote QS Ar-Rum 21 matching Reference #1 card bottom */}
            <div
              className="mt-6 pt-6 max-w-lg mx-auto"
              style={{ borderTop: "1px solid rgba(201,162,39,0.35)" }}
            >
              <div className="text-3xl font-serif mb-1" style={{ color: "#C9A227" }}>
                &ldquo;
              </div>
              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed font-serif">
                {weddingData.quote.translation}
              </p>
              <p
                className="text-xs font-semibold mt-2.5 tracking-wider"
                style={{ color: "#540C0C" }}
              >
                ({weddingData.quote.source})
              </p>
            </div>
          </ParchmentCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
