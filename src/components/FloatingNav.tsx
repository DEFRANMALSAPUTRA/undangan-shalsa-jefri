"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Heart,
  BookOpen,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Gift,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "mempelai", label: "Mempelai", icon: Heart },
  { id: "cerita", label: "Kisah Cinta", icon: BookOpen },
  { id: "acara", label: "Acara", icon: Calendar },
  { id: "galeri", label: "Galeri", icon: ImageIcon },
  { id: "rsvp", label: "RSVP", icon: MessageSquare },
  { id: "hadiah", label: "Hadiah", icon: Gift },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    // Use IntersectionObserver for reliable active section detection
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    const observerMap = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          observerMap.set(entry.target.id, entry);
        });

        let topmostId = "";
        let topmostTop = Infinity;

        observerMap.forEach((entry, id) => {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (rect.top < topmostTop) {
              topmostTop = rect.top;
              topmostId = id;
            }
          }
        });

        if (topmostId) {
          setActiveSection(topmostId);
          return;
        }

        // Fallback: check window scroll position
        const scrollY = window.scrollY + 200;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.offsetTop <= scrollY) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      },
      {
        rootMargin: "-15% 0px -40% 0px",
        threshold: [0, 0.2, 0.5, 0.8],
      }
    );

    // Observe each section
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Scroll listener fallback
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none">
      <nav
        aria-label="Navigasi Undangan"
        className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300"
        style={{
          background: "rgba(45, 6, 6, 0.92)",
          border: "1.5px solid #C9A227",
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 162, 39, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip on Hover */}
              {isHovered && (
                <div
                  className="absolute -top-9 px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap animate-fade-in pointer-events-none shadow-md"
                  style={{
                    background: "rgba(45, 6, 6, 0.95)",
                    border: "1px solid #C9A227",
                    color: "#FAF0DC",
                  }}
                >
                  {item.label}
                </div>
              )}

              {/* Icon Button */}
              <button
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={item.label}
                title={item.label}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 ${
                  isActive
                    ? "scale-105 shadow-md"
                    : "hover:scale-105 hover:bg-white/10"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #C9A227 0%, #F5DC88 50%, #D4A835 100%)"
                    : "transparent",
                  color: isActive ? "#3D0000" : "rgba(250, 240, 220, 0.8)",
                  boxShadow: isActive ? "0 0 12px rgba(201, 162, 39, 0.6)" : "none",
                }}
              >
                <Icon
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                    isActive ? "stroke-[2.5]" : "stroke-[1.8]"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
