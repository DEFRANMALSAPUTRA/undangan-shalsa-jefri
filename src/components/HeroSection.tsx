"use client";

import React, { useState, useEffect } from "react";
import { MailOpen, Heart, CalendarPlus, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { weddingData } from "@/data/weddingData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface HeroSectionProps {
  isOpened?: boolean;
  onOpen?: () => void;
}

export default function HeroSection({ isOpened = false, onOpen }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [guestName, setGuestName] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("u") || params.get("p") || params.get("nama") || "";
      if (to) {
        setGuestName(to);
      }
    }

    const parseTargetDate = () => {
      const parsed = Date.parse(weddingData.eventDate);
      if (!isNaN(parsed)) return parsed;
      // Fallback for older browsers
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
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261009T030000Z/20261009T110000Z&location=${loc}&details=Undangan+Pernikahan+Shalsa+%26+Jefri`,
      "_blank"
    );
  };

  const scrollToMempelai = () => {
    document.getElementById("mempelai")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="beranda"
      className="relative w-full h-[100dvh] min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "#2D0505" }}
    >
      {/* Rumah Gadang background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-rumah-gadang.jpg"
          alt="Rumah Gadang - The Wedding of Shalsa & Jefri"
          fill
          className="object-cover object-top sm:object-center"
          priority
        />
        {/* Seamless dark maroon gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,4,4,0.45) 0%, rgba(30,4,4,0.35) 30%, rgba(45,6,6,0.65) 60%, rgba(45,8,8,0.85) 100%)",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 px-4 max-w-xl mx-auto text-center w-full flex flex-col items-center justify-center py-6">
        <div className="animate-fade-in" style={{ animationDuration: "0.8s" }}>
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.4em] font-semibold mb-1 sm:mb-2"
            style={{ color: "#E5C06E", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            The Wedding Of
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDuration: "1s" }}>
          <h1
            className="my-1.5 sm:my-2"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(3.2rem, 10vw, 5.5rem)",
              color: "#E5C06E",
              lineHeight: 1.05,
              textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 0 25px rgba(201,162,39,0.4)",
            }}
          >
            {weddingData.bride.name}
            <br />
            <span
              style={{
                fontSize: "0.5em",
                color: "#FAF0DC",
                fontStyle: "normal",
                textShadow: "0 2px 15px rgba(0,0,0,0.8)",
              }}
            >
              &amp;
            </span>
            <br />
            {weddingData.groom.name}
          </h1>
        </div>

        {/* Date & Location */}
        <div className="animate-fade-in" style={{ animationDuration: "1.2s" }}>
          <div className="mt-2.5 sm:mt-3 space-y-0.5">
            <p
              className="font-serif font-bold tracking-[0.25em] text-sm sm:text-base"
              style={{
                color: "#FAF0DC",
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              09 . 10 . 2026
            </p>
            <p
              className="text-[11px] sm:text-xs font-medium tracking-wider"
              style={{
                color: "#E5C06E",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              Tanjung Mutiara, Sumatera Barat
            </p>
          </div>
        </div>

        {/* State 1: Before Opening — Guest Name & Buka Undangan Button */}
        {!isOpened && onOpen && (
          <div className="mt-5 sm:mt-7 space-y-3.5 animate-fade-in" style={{ animationDuration: "1.4s" }}>
            {/* Guest recipient badge */}
            <div
              className="inline-block px-5 py-2.5 rounded-xl backdrop-blur-md"
              style={{
                background: "rgba(45, 6, 6, 0.75)",
                border: "1px solid rgba(201, 162, 39, 0.5)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
              }}
            >
              <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#E5C06E] font-medium mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <p className="font-serif font-bold text-sm sm:text-base text-[#FAF0DC] tracking-wide">
                {guestName || "Tamu Undangan"}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpen}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
                style={{
                  background: "linear-gradient(135deg, #C9A227 0%, #F5DC88 50%, #D4A835 100%)",
                  color: "#3D0000",
                  boxShadow: "0 6px 30px rgba(201,162,39,0.55), 0 2px 8px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,240,180,0.4)",
                  touchAction: "manipulation",
                }}
              >
                <MailOpen className="w-4 h-4" />
                Buka Undangan
                <Heart className="w-3.5 h-3.5 fill-current" style={{ color: "#7B1A1A" }} />
              </button>
            </div>
          </div>
        )}

        {/* State 2: After Opening — Compact Countdown Timer */}
        {isOpened && (
          <div className="mt-5 sm:mt-6 animate-fade-in transition-all duration-700">
            <p
              className="font-serif italic text-xs sm:text-sm tracking-wide mb-2.5"
              style={{ color: "#E5C06E", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
            >
              — Menuju Hari Bahagia —
            </p>

            {/* 4 Compact Countdown Boxes */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
              {[
                { label: "Hari", val: isMounted ? timeLeft.days : 0 },
                { label: "Jam", val: isMounted ? timeLeft.hours : 0 },
                { label: "Menit", val: isMounted ? timeLeft.minutes : 0 },
                { label: "Detik", val: isMounted ? timeLeft.seconds : 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg py-1.5 px-1 sm:py-2 sm:px-1.5 text-center backdrop-blur-sm transition-transform duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(104,16,16,0.85), rgba(74,8,8,0.9))",
                    border: "1px solid rgba(201,162,39,0.55)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(229,192,110,0.3)",
                  }}
                >
                  <span
                    className="block text-base sm:text-xl font-serif font-bold leading-none"
                    style={{ color: "#FAF0DC" }}
                  >
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span
                    className="block text-[8px] sm:text-[9px] uppercase tracking-wider mt-1 font-medium leading-none"
                    style={{ color: "#E5C06E" }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Compact Save to Calendar Link */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={handleAddToCalendar}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all hover:scale-105"
                style={{
                  background: "rgba(45,6,6,0.8)",
                  border: "1px solid rgba(201,162,39,0.6)",
                  color: "#FAF0DC",
                }}
              >
                <CalendarPlus className="w-3 h-3 text-[#E5C06E]" />
                <span>Simpan ke Kalender</span>
              </button>
            </div>

            {/* Scroll Down Indicator */}
            <button
              onClick={scrollToMempelai}
              className="mt-3 mx-auto flex flex-col items-center gap-0.5 opacity-80 hover:opacity-100 transition-opacity animate-bounce cursor-pointer"
              aria-label="Scroll ke isi undangan"
            >
              <span className="text-[9px] uppercase tracking-widest text-[#E5C06E]">Scroll</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#E5C06E]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
