"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CalendarPlus } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";
import { GoldHeaderDivider } from "@/components/MinangDecorations";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const parseTargetDate = () => {
      const parsed = Date.parse(weddingData.eventDate);
      if (!isNaN(parsed)) return parsed;
      return new Date(2026, 9, 9, 10, 0, 0).getTime();
    };

    const targetDate = parseTargetDate();
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculateTime();
    const id = setInterval(calculateTime, 1000);
    return () => clearInterval(id);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Baralek Gadang ${weddingData.bride.name} & ${weddingData.groom.name}`);
    const loc = encodeURIComponent(`${weddingData.events[0].venue}, ${weddingData.events[0].address}`);
    // 09 Oktober 2026 10:00 WIB (03:00 UTC)
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261009T030000Z/20261009T110000Z&location=${loc}&details=Undangan+Pernikahan+Shalsa+%26+Jefri`,
      "_blank"
    );
  };

  return (
    <section
      id="hitung-waktu"
      className="relative py-20 px-4 text-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #2D0505 0%, #450808 40%, #380606 75%, #250404 100%)",
      }}
    >
      {/* Background Rumah Gadang silhouette smoothly blending in */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/minang-rumah-gadang.jpg"
          alt="Rumah Gadang Sunset"
          fill
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #2D0505 0%, transparent 25%, transparent 75%, #250404 100%)",
          }}
        />
      </div>

      {/* Subtle Songket pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#C9A227 0px,#C9A227 1px,transparent 1px,transparent 12px)",
        }}
      />

      <div className="relative z-10 max-w-md mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.2}>
          <GoldHeaderDivider className="w-32 h-6 mb-2 opacity-80" />
          <h2
            className="font-serif italic text-2xl sm:text-3xl mb-8"
            style={{
              color: "#E5C06E",
              textShadow: "0 2px 15px rgba(201,162,39,0.3)",
            }}
          >
            Menuju Hari Bahagia
          </h2>
        </ScrollReveal>

        {/* 4 Maroon countdown boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
          {[
            { label: "Hari", val: isMounted ? timeLeft.days : 0 },
            { label: "Jam", val: isMounted ? timeLeft.hours : 0 },
            { label: "Menit", val: isMounted ? timeLeft.minutes : 0 },
            { label: "Detik", val: isMounted ? timeLeft.seconds : 0 },
          ].map((item, i) => (
            <ScrollReveal key={item.label} animation="scale-up" delay={i * 70} threshold={0.2}>
              <div
                className="rounded-xl py-3 px-1 sm:py-4 sm:px-2 text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #681010, #4A0808)",
                  border: "1.5px solid rgba(201,162,39,0.6)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(229,192,110,0.3)",
                }}
              >
                <span
                  className="block text-2xl sm:text-4xl font-serif font-bold"
                  style={{ color: "#FAF0DC" }}
                >
                  {String(item.val).padStart(2, "0")}
                </span>
                <span
                  className="block text-[10px] sm:text-xs uppercase tracking-wider mt-1 font-medium"
                  style={{ color: "#E5C06E" }}
                >
                  {item.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Save to Calendar Button */}
        <ScrollReveal animation="fade-up" delay={350} threshold={0.2}>
          <div className="mt-8">
            <button
              onClick={handleAddToCalendar}
              className="btn-maroon text-xs hover:scale-105 transition-transform"
              style={{ padding: "0.6rem 1.8rem" }}
            >
              <CalendarPlus className="w-4 h-4 text-[#E5C06E]" />
              <span>Simpan ke Kalender</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
