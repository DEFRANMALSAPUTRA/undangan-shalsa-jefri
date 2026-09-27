"use client";

import React from "react";
import { Heart, Sparkles, BookOpen } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard, GoldHeaderDivider, GoldCornerFiligree } from "@/components/MinangDecorations";

export default function StorySection() {
  return (
    <section
      id="cerita"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-2xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          <ParchmentCard className="py-10 px-4 sm:px-8">
            {/* Header */}
            <div className="text-center mb-10">
              <GoldHeaderDivider className="w-32 h-6 mb-2" />
              <p
                className="text-xs uppercase tracking-[0.3em] font-semibold mb-1"
                style={{ color: "#C9A227" }}
              >
                Kisah Kami
              </p>
              <h2
                className="font-serif italic text-3xl sm:text-4xl mb-3"
                style={{
                  color: "#540C0C",
                  textShadow: "0 1px 2px rgba(201,162,39,0.2)",
                }}
              >
                Sebuah Perjalanan Pulang
              </h2>
              <div className="relative max-w-lg mx-auto my-4 p-4 rounded-xl" style={{ background: "rgba(201,162,39,0.08)", border: "1px dashed rgba(201,162,39,0.4)" }}>
                <p className="text-xs sm:text-sm text-[#540C0C] italic font-serif leading-relaxed font-medium">
                  &ldquo;Banyak yang berkata bahwa jatuh cinta adalah sederhana. Namun, tetap saling memilih di tengah badai, menjaga di saat rapuh, dan bertahan ketika dunia meminta menyerah itulah cinta yang sesungguhnya.&rdquo;
                </p>
              </div>
            </div>

            {/* Chapters Container */}
            <div className="relative pl-6 sm:pl-8">
              {/* Vertical Golden Connecting Line */}
              <div
                className="absolute left-2.5 sm:left-3.5 top-6 bottom-6 w-0.5"
                style={{
                  background:
                    "linear-gradient(to bottom, #C9A227, #681010 30%, #681010 70%, #C9A227)",
                  opacity: 0.45,
                }}
              />

              <div className="space-y-8 sm:space-y-10">
                {weddingData.stories.map((story, index) => {
                  return (
                    <div key={story.title} className="relative">
                      {/* Chapter Marker Node on the line */}
                      <div
                        className="absolute -left-[27px] sm:-left-[31px] top-4 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #681010, #4A0808)",
                          border: "2px solid #C9A227",
                          boxShadow: "0 0 10px rgba(201,162,39,0.4)",
                        }}
                      >
                        <Heart className="w-3 h-3 text-[#E5C06E] fill-current" />
                      </div>

                      {/* Chapter Parchment Card */}
                      <ScrollReveal animation="fade-up" threshold={0.15}>
                        <div
                          className="relative p-5 sm:p-7 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                          style={{
                            background: "rgba(255, 255, 255, 0.85)",
                            border: "1.5px solid rgba(201,162,39,0.4)",
                            boxShadow: "0 4px 18px rgba(84,12,12,0.05)",
                          }}
                        >
                          {/* Delicate corner filigrees for each story card */}
                          <GoldCornerFiligree position="top-right" className="w-8 h-8 opacity-60" />
                          <GoldCornerFiligree position="bottom-left" className="w-8 h-8 opacity-60" />

                          {/* Top Badge: Chapter Name */}
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                              style={{
                                background: "linear-gradient(135deg, #C9A227, #F5DC88)",
                                color: "#3D0000",
                                boxShadow: "0 1px 4px rgba(201,162,39,0.3)",
                              }}
                            >
                              <Sparkles className="w-3 h-3" />
                              {story.year}
                            </span>
                          </div>

                          {/* Chapter Title */}
                          <h3
                            className="font-serif text-xl sm:text-2xl font-bold mb-3"
                            style={{ color: "#540C0C" }}
                          >
                            {story.title}
                          </h3>

                          {/* Gold Divider Line */}
                          <div
                            className="w-16 h-0.5 mb-4"
                            style={{
                              background: "linear-gradient(to right, #C9A227, transparent)",
                            }}
                          />

                          {/* Chapter Narrative Text */}
                          <p className="text-xs sm:text-sm text-[#4A2020] leading-relaxed whitespace-pre-line font-serif italic text-justify sm:text-left">
                            {story.description}
                          </p>
                        </div>
                      </ScrollReveal>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bookend Motif */}
            <div className="text-center mt-10 pt-6 border-t border-[rgba(201,162,39,0.3)]">
              <GoldHeaderDivider className="w-28 h-5 mb-2 opacity-70" />
              <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8C6D1F]">
                Menuju Ridho &amp; Berkah-Nya
              </p>
            </div>
          </ParchmentCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
