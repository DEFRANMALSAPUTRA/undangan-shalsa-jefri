"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, Eye, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { GoldHeaderDivider } from "@/components/MinangDecorations";
import { weddingData } from "@/data/weddingData";

export default function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev! + 1) % weddingData.gallery.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) =>
        prev! === 0 ? weddingData.gallery.length - 1 : prev! - 1
      );
    }
  };

  // Touch Swipe for mobile
  const minSwipeDistance = 45;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <section
      id="galeri"
      className="py-16 px-4 max-w-4xl mx-auto text-center relative"
      style={{ background: "#FDF8EF" }}
    >
      {/* Header */}
      <ScrollReveal animation="fade-up" threshold={0.2}>
        <div className="mb-10">
          <GoldHeaderDivider className="w-36 h-7 mb-2 opacity-80" />
          <h2
            className="font-serif italic text-3xl sm:text-4xl"
            style={{ color: "#540C0C" }}
          >
            Galeri
          </h2>
          <p className="text-xs sm:text-sm text-[#7A5555] font-serif italic mt-1">
            Momen bahagia &amp; kebersamaan Shalsa &amp; Jefri
          </p>
        </div>
      </ScrollReveal>

      {/* Editorial Grid with Shalsa & Jefri photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto">
        {/* Photo 1: Large portrait on left (spans 2 cols & 2 rows on desktop) */}
        {weddingData.gallery[0] && (
          <div
            onClick={() => openLightbox(0)}
            className="col-span-2 sm:col-span-2 sm:row-span-2 relative h-72 sm:h-[26rem] rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[0].url}
              alt={weddingData.gallery[0].title}
              fill
              className="object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5C06E]" />
                {weddingData.gallery[0].title}
              </span>
            </div>
          </div>
        )}

        {/* Photo 2: Top right */}
        {weddingData.gallery[1] && (
          <div
            onClick={() => openLightbox(1)}
            className="col-span-1 relative h-36 sm:h-[12.5rem] rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[1].url}
              alt={weddingData.gallery[1].title}
              fill
              className="object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
              <Eye className="w-3.5 h-3.5 text-[#E5C06E]" />
            </div>
          </div>
        )}

        {/* Photo 3: Middle right (Ka Shalsa Solo) */}
        {weddingData.gallery[2] && (
          <div
            onClick={() => openLightbox(2)}
            className="col-span-1 relative h-36 sm:h-[12.5rem] rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[2].url}
              alt={weddingData.gallery[2].title}
              fill
              className="object-cover object-[center_46%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
              <Eye className="w-3.5 h-3.5 text-[#E5C06E]" />
            </div>
          </div>
        )}

        {/* Photo 4: Bottom left */}
        {weddingData.gallery[3] && (
          <div
            onClick={() => openLightbox(3)}
            className="col-span-1 sm:col-span-1 relative h-36 sm:h-48 rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[3].url}
              alt={weddingData.gallery[3].title}
              fill
              className="object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
              <Eye className="w-3.5 h-3.5 text-[#E5C06E]" />
            </div>
          </div>
        )}

        {/* Photo 5: Bottom middle */}
        {weddingData.gallery[4] && (
          <div
            onClick={() => openLightbox(4)}
            className="col-span-1 sm:col-span-1 relative h-36 sm:h-48 rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[4].url}
              alt={weddingData.gallery[4].title}
              fill
              className="object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
              <Eye className="w-3.5 h-3.5 text-[#E5C06E]" />
            </div>
          </div>
        )}

        {/* Photo 6: Bottom right (Pose Berdua di Paling Bawah) */}
        {weddingData.gallery[5] && (
          <div
            onClick={() => openLightbox(5)}
            className="col-span-2 sm:col-span-1 relative h-40 sm:h-48 rounded-xl overflow-hidden cursor-pointer group shadow-card border"
            style={{ borderColor: "#C9A227" }}
          >
            <Image
              src={weddingData.gallery[5].url}
              alt={weddingData.gallery[5].title}
              fill
              className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
              <Eye className="w-3.5 h-3.5 text-[#E5C06E]" />
            </div>
          </div>
        )}
      </div>

      {/* Button: "Buka Semua Foto" */}
      <div className="mt-8">
        <button onClick={() => openLightbox(0)} className="btn-maroon text-xs">
          <span>Lihat Galeri Foto</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#E5C06E]" />
        </button>
      </div>

      {/* Enhanced Lightbox Modal using React Portal directly to document.body */}
      {isMounted && selectedImageIndex !== null && typeof document !== "undefined" && createPortal(
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-between p-3 sm:p-6 animate-fade-in select-none"
          style={{ touchAction: "none" }}
        >
          {/* Top Bar (Title & Close Button) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl flex items-center justify-between pt-1 pb-2 px-2 z-10"
          >
            <div>
              <p className="text-white/90 font-serif font-bold text-sm sm:text-base">
                {weddingData.gallery[selectedImageIndex].title}
              </p>
              <span
                className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block mt-0.5"
                style={{
                  background: "rgba(201,162,39,0.2)",
                  color: "#E5C06E",
                  border: "1px solid rgba(201,162,39,0.5)",
                }}
              >
                {selectedImageIndex + 1} dari {weddingData.gallery.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              aria-label="Tutup Galeri"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#FAF0DC] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #681010, #3D0000)",
                border: "1px solid #C9A227",
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              <span>Tutup</span>
              <X className="w-4 h-4 text-[#E5C06E]" />
            </button>
          </div>

          {/* Center Image Container with Navigation */}
          <div
            className="relative w-full flex-1 flex items-center justify-center my-auto py-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Left Nav Arrow */}
            <button
              onClick={prevImage}
              aria-label="Foto Sebelumnya"
              className="absolute left-1 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              style={{
                background: "rgba(45,5,5,0.75)",
                border: "1.5px solid #C9A227",
                color: "#E5C06E",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Picture Frame */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[66vh] sm:max-h-[74vh] flex items-center justify-center p-1.5 rounded-2xl transition-all duration-300"
              style={{
                border: "2px solid #C9A227",
                background: "linear-gradient(135deg, #3D0505, #1F0202)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(201,162,39,0.35)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={selectedImageIndex}
                src={weddingData.gallery[selectedImageIndex].url}
                alt={weddingData.gallery[selectedImageIndex].title}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-[84vw] sm:max-w-md object-contain rounded-xl select-none"
              />
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={nextImage}
              aria-label="Foto Selanjutnya"
              className="absolute right-1 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
              style={{
                background: "rgba(45,5,5,0.75)",
                border: "1.5px solid #C9A227",
                color: "#E5C06E",
                backdropFilter: "blur(4px)",
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Navigator */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md flex items-center justify-center gap-2.5 sm:gap-3 py-2 px-3 rounded-2xl z-10"
            style={{
              background: "rgba(45,5,5,0.6)",
              border: "1px solid rgba(201,162,39,0.4)",
              backdropFilter: "blur(8px)",
            }}
          >
            {weddingData.gallery.map((item, idx) => {
              const isActive = idx === selectedImageIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-12 h-14 sm:w-14 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${isActive
                      ? "scale-110 ring-2 ring-[#E5C06E] shadow-md shadow-[#C9A227]/40"
                      : "opacity-60 hover:opacity-100 scale-95"
                    }`}
                  style={{
                    border: isActive ? "1.5px solid #FAF0DC" : "1px solid rgba(201,162,39,0.5)",
                  }}
                  aria-label={`Lihat ${item.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover object-[center_55%]"
                  />
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
