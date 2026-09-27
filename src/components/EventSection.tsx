"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";
import { RumahGadangIcon, GoldHeaderDivider } from "@/components/MinangDecorations";

export default function EventSection() {
  return (
    <section
      id="acara"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* ── KARTU ACARA ── */}
        <ScrollReveal animation="fade-up" threshold={0.2}>
          <div className="text-center mb-10">
            <GoldHeaderDivider className="w-36 h-7 mb-2 opacity-80" />
            <h2
              className="font-serif italic text-3xl sm:text-4xl"
              style={{ color: "#540C0C" }}
            >
              Rangkaian Acara
            </h2>
          </div>
        </ScrollReveal>

        {/* 2 Event Cards (Akad Nikah & Resepsi) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
          {weddingData.events.map((event, index) => (
            <ScrollReveal
              key={event.id}
              animation={index === 0 ? "fade-right" : "fade-left"}
              delay={index * 120}
              threshold={0.15}
            >
              <div
                className="rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-between h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "#FAF0DC",
                  border: "1.5px solid #C9A227",
                  boxShadow: "0 8px 24px rgba(84,12,12,0.08)",
                }}
              >
                {/* Traditional Rumah Gadang Icon */}
                <div className="mb-3">
                  <RumahGadangIcon className="w-16 h-12" />
                </div>

                {/* Title */}
                <h3
                  className="font-serif font-bold text-xl mb-3"
                  style={{ color: "#540C0C" }}
                >
                  {event.title}
                </h3>

                {/* Divider line */}
                <div
                  className="w-16 h-0.5 rounded-full mb-4"
                  style={{ background: "#C9A227" }}
                />

                {/* Date & Time */}
                <div className="space-y-1 mb-4">
                  <p className="font-semibold text-sm sm:text-base text-gray-900">
                    {event.date}
                  </p>
                  <p className="font-bold text-sm" style={{ color: "#7B1A1A" }}>
                    {event.time} {event.zone}
                  </p>
                </div>

                {/* Venue & City */}
                <div className="text-xs text-gray-700 leading-relaxed mb-6">
                  <p className="font-bold text-sm" style={{ color: "#540C0C" }}>
                    {event.venue}
                  </p>
                  <p className="text-gray-600 mt-1">{event.address}</p>
                </div>

                {/* Petunjuk Arah mini link */}
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
                  style={{
                    color: "#FAF0DC",
                    background: "linear-gradient(135deg, #4A0808, #7B1A1A)",
                    border: "1px solid #C9A227",
                  }}
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E5C06E]" />
                  <span>Petunjuk Arah</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Note below Event Cards */}
        <ScrollReveal animation="fade-up" delay={200} threshold={0.2}>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto text-center leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir, untuk memberikan doa restu kepada kami.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
