"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, MessageSquare, Heart, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard } from "@/components/MinangDecorations";

export interface Wish {
  id: string;
  name: string;
  status: "Hadir" | "Tidak Hadir" | "Ragu-ragu";
  message: string;
  createdAt: string;
  likes: number;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: "1",
    name: "Dimas Pratama & Keluarga",
    status: "Hadir",
    message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair. Selamat untuk Shalsa & Jefri! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: "Baru saja",
    likes: 8,
  },
  {
    id: "2",
    name: "Siti Rahmadani",
    status: "Hadir",
    message: "Selamat menempuh hidup baru untuk Shalsa & Jefri! Semoga berkah dan bahagia selalu sampai maut memisahkan. Aamiin ya rabbal alamin.",
    createdAt: "1 jam lalu",
    likes: 5,
  },
  {
    id: "3",
    name: "Budi Santoso & Rekan",
    status: "Tidak Hadir",
    message: "Selamat berbahagia untuk kedua mempelai! Mohon maaf belum bisa hadir langsung, namun doa terbaik senantiasa kami panjatkan untuk Shalsa & Jefri.",
    createdAt: "3 jam lalu",
    likes: 3,
  },
];

export default function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Hadir" | "Tidak Hadir" | "Ragu-ragu">("Hadir");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_wishes_minang");
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      status,
      message: message.trim() || "Selamat berbahagia dan semoga sakinah, mawaddah, warahmah.",
      createdAt: "Baru saja",
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);

    try {
      localStorage.setItem("wedding_wishes_minang", JSON.stringify(updated));
    } catch {
      /* ignore */
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#C9A227", "#E5C06E", "#540C0C", "#FAF0DC"],
      });
    } catch {
      /* ignore */
    }

    setIsSubmitted(true);
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    setWishes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <section
      id="rsvp"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          {/* Parchment Card matching Reference #8 */}
          <ParchmentCard className="text-center py-8 px-6 sm:px-10">
            {/* Title */}
            <h2
              className="font-serif italic text-2xl sm:text-3xl mb-1"
              style={{ color: "#540C0C" }}
            >
              Konfirmasi Kehadiran
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-6">
              Dimohon untuk mengisi form konfirmasi kehadiran di bawah ini.
            </p>

            {isSubmitted ? (
              <div className="py-6 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(201,162,39,0.15)", border: "1px solid #C9A227" }}
                >
                  <CheckCircle2 className="w-6 h-6" style={{ color: "#540C0C" }} />
                </div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">
                  Terima Kasih!
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  Konfirmasi kehadiran Anda telah berhasil kami terima.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage("");
                  }}
                  className="text-xs font-semibold underline text-[#540C0C]"
                >
                  Kirim Konfirmasi Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Nama Lengkap */}
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8]"
                    style={{ borderColor: "#C9A227" }}
                  />
                </div>

                {/* Pilih Kehadiran */}
                <div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8] text-gray-800"
                    style={{ borderColor: "#C9A227" }}
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                    <option value="Ragu-ragu">Masih Ragu-ragu</option>
                  </select>
                </div>

                {/* Ucapan & Doa */}
                <div>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ucapan & Doa Restu (opsional)"
                    className="w-full p-3 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8] resize-none"
                    style={{ borderColor: "#C9A227" }}
                  />
                </div>

                {/* Button: "Kirim Konfirmasi" matching Reference #8 */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="btn-maroon w-full sm:w-auto"
                    style={{ padding: "0.7rem 2.8rem" }}
                  >
                    <Send className="w-3.5 h-3.5 text-[#E5C06E]" />
                    <span>Kirim Konfirmasi</span>
                  </button>
                </div>
              </form>
            )}
          </ParchmentCard>
        </ScrollReveal>

        {/* Live Guestbook comments */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#540C0C]" />
              <span className="font-serif font-bold text-sm text-gray-900">
                Untaian Doa &amp; Ucapan ({wishes.length})
              </span>
            </div>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-3.5 rounded-xl border text-left text-xs sm:text-sm"
                style={{
                  background: "#FAF0DC",
                  borderColor: "rgba(201,162,39,0.4)",
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="font-bold text-gray-900">{wish.name}</span>
                    <span
                      className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          wish.status === "Hadir"
                            ? "rgba(45,122,74,0.15)"
                            : "rgba(104,16,16,0.12)",
                        color: wish.status === "Hadir" ? "#1A4A2E" : "#540C0C",
                        border: "1px solid rgba(201,162,39,0.3)",
                      }}
                    >
                      {wish.status}
                    </span>
                  </div>
                  <button
                    onClick={() => handleLike(wish.id)}
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-rose-600"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likedMap[wish.id] ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                    <span>{wish.likes}</span>
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed mt-1 text-xs">{wish.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
