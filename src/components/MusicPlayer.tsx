"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Music2, ChevronRight, ChevronLeft } from "lucide-react";
import { weddingData } from "@/data/weddingData";

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function MusicPlayer({ isPlaying, onTogglePlay }: MusicPlayerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed top-24 sm:top-28 right-0 z-40 flex items-center transition-all duration-500 ease-out select-none ${
        isCollapsed ? "translate-x-[calc(100%-38px)]" : "translate-x-0"
      }`}
    >
      {/* Container Pill */}
      <div
        className="flex items-center pl-2.5 pr-3 py-1.5 rounded-l-full shadow-2xl backdrop-blur-md transition-all duration-300 group"
        style={{
          background: "linear-gradient(135deg, rgba(55, 7, 7, 0.95) 0%, rgba(35, 4, 4, 0.98) 100%)",
          border: "1.5px solid #C9A227",
          borderRight: "none",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(201, 162, 39, 0.35)",
        }}
      >
        {/* Toggle Collapse Chevron Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Buka pemutar musik" : "Sembunyikan ke samping"}
          title={isCollapsed ? "Buka pemutar musik" : "Sembunyikan ke samping"}
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 text-[#E5C06E] hover:text-[#FAF0DC] hover:bg-white/10 mr-1.5"
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4 animate-pulse" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Music Info & Mini Equalizer (visible when expanded) */}
        {!isCollapsed && (
          <div className="hidden sm:flex items-center gap-2.5 pr-2 animate-fade-in">
            {/* Animated Equalizer Soundwaves */}
            <div className="flex items-end gap-0.5 h-3.5 px-1">
              {[0.4, 0.8, 0.5, 0.9, 0.6].map((h, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : "h-1"
                  }`}
                  style={{
                    height: isPlaying ? `${h * 100}%` : "3px",
                    background: "linear-gradient(to top, #C9A227, #F5DC88)",
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              ))}
            </div>

            {/* Song title */}
            <div className="flex flex-col text-left max-w-[110px]">
              <span className="text-[8px] uppercase tracking-wider font-bold text-[#E5C06E] leading-tight">
                {isPlaying ? "Memutar" : "Jeda"}
              </span>
              <span className="text-[10px] font-medium text-[#FAF0DC] truncate leading-tight">
                {weddingData.audio.title}
              </span>
            </div>
          </div>
        )}

        {/* Realistic Vinyl Record Disc Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
          title={isPlaying ? "Klik untuk jeda musik" : "Klik untuk memutar musik"}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 hover:scale-105 shadow-md cursor-pointer ${
            isPlaying ? "shadow-[0_0_15px_rgba(201,162,39,0.6)]" : "opacity-80 hover:opacity-100"
          }`}
          style={{
            background: "radial-gradient(circle, #2A0505 0%, #150202 70%, #3D0808 100%)",
            border: "1.5px solid #C9A227",
          }}
        >
          {/* Vinyl Grooves Texture */}
          <div
            className={`absolute inset-0.5 rounded-full pointer-events-none ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
            style={{
              background:
                "repeating-radial-gradient(circle, transparent, transparent 2px, rgba(201, 162, 39, 0.15) 3px, transparent 4px)",
            }}
          >
            {/* Vinyl Center Gold Ring */}
            <div
              className="absolute inset-2.5 rounded-full border flex items-center justify-center"
              style={{
                borderColor: "rgba(201, 162, 39, 0.6)",
                background: "linear-gradient(135deg, #7A1A1A, #4A0808)",
              }}
            >
              {/* Center Spindle Dot */}
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#F5DC88" }}
              />
            </div>
          </div>

          {/* Center Icon Overlay */}
          <div className="relative z-10 text-[#E5C06E] drop-shadow-md">
            {isPlaying ? (
              <Music2 className="w-4 h-4 animate-bounce-slow" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-75" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
