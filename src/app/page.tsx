"use client";

import React, { useState, useEffect, useRef } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import StorySection from "@/components/StorySection";
import EventSection from "@/components/EventSection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";
import FallingPetals from "@/components/FallingPetals";
import { weddingData } from "@/data/weddingData";

function WeddingInvitationContent() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(weddingData.audio.url);
    audioRef.current.loop = true;
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Lock scroll until user opens the invitation
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    // Auto-play music on open
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Audio play error:", err);
          setIsPlaying(false);
        });
    }

    // Smooth scroll down to main invitation content
    setTimeout(() => {
      const el = document.getElementById("mempelai");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#FDF8EF", color: "#3D0000" }}>
      {/* Falling flower petals ambient effect */}
      <FallingPetals />

      {/* Floating Bottom Navigation — visible only after opened */}
      {isOpened && <FloatingNav />}

      {/* Floating Audio Player — visible only after opened */}
      {isOpened && <MusicPlayer isPlaying={isPlaying} onTogglePlay={handleTogglePlay} />}

      {/* All Sections */}
      <div className={isOpened ? "pb-24" : ""}>
        {/* 1. Hero Cover with integrated compact Countdown that appears upon opening */}
        <HeroSection isOpened={isOpened} onOpen={handleOpen} />

        {/* Rest of content — rendered and scrollable only after opened */}
        {isOpened && (
          <div className="transition-opacity duration-700 animate-fade-in">
            {/* 2. Mempelai (Arch Frames & QS Ar-Rum 21) */}
            <CoupleSection />

            {/* 3. Kisah Cinta (Love Story Timeline) */}
            <StorySection />

            {/* 4. Kartu Acara (Akad & Resepsi) */}
            <EventSection />

            {/* 5. Galeri (Editorial 6-photo grid) */}
            <GallerySection />

            {/* 6. Form RSVP (Konfirmasi Kehadiran) */}
            <RsvpSection />

            {/* 7. Kirim Hadiah */}
            <GiftSection />

            {/* 8. Terima Kasih (Footer Card) */}
            <Footer />
          </div>
        )}
      </div>
    </main>
  );
}

export default function WeddingPage() {
  return <WeddingInvitationContent />;
}
