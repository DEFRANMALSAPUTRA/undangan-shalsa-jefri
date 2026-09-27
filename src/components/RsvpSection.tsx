"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, MessageSquare, Heart, Send, Loader2, Trash2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard } from "@/components/MinangDecorations";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface Wish {
  id: string | number;
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

function formatTimeAgo(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "Baru saja";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Baru saja";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} hari lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Hadir" | "Tidak Hadir" | "Ragu-ragu">("Hadir");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string | number, boolean>>({});
  const [myWishIds, setMyWishIds] = useState<string[]>([]);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // Load saved myWishIds from localStorage
  useEffect(() => {
    try {
      const savedIds = localStorage.getItem("wedding_my_wish_ids");
      if (savedIds) {
        setMyWishIds(JSON.parse(savedIds));
      }
    } catch {
      /* ignore */
    }
  }, []);

  // 1. Load Wishes (from Supabase or fallback to LocalStorage/Defaults)
  const fetchWishes = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: Wish[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            status: (item.status as any) || "Hadir",
            message: item.message,
            createdAt: formatTimeAgo(item.created_at),
            likes: Number(item.likes || 0),
          }));
          setWishes(mapped);
          return;
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    }

    // Fallback if Supabase is not yet configured
    try {
      const saved = localStorage.getItem("wedding_wishes_minang");
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchWishes();

    // 2. Realtime listener if Supabase is enabled
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel("realtime_wishes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "wishes" },
          () => {
            fetchWishes();
          }
        )
        .subscribe();

      return () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, [fetchWishes]);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const trimmedName = name.trim();
    const finalMsg = message.trim() || "Selamat berbahagia dan semoga sakinah, mawaddah, warahmah.";

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from("wishes")
          .insert([
            {
              name: trimmedName,
              status,
              message: finalMsg,
              likes: 0,
            },
          ])
          .select();

        if (error) {
          console.error("Supabase insert error:", error);
          alert("Gagal mengirim ke database: " + error.message);
        } else if (data && data.length > 0) {
          // Track this new wish as created by the current user
          const newId = String(data[0].id);
          const updatedMyIds = [...myWishIds, newId];
          setMyWishIds(updatedMyIds);
          try {
            localStorage.setItem("wedding_my_wish_ids", JSON.stringify(updatedMyIds));
          } catch {
            /* ignore */
          }
          await fetchWishes();
        }
      } catch (err) {
        console.error("Submit error:", err);
      }
    } else {
      // Offline / LocalStorage fallback
      const generatedId = Date.now().toString();
      const newWish: Wish = {
        id: generatedId,
        name: trimmedName,
        status,
        message: finalMsg,
        createdAt: "Baru saja",
        likes: 0,
      };

      const updated = [newWish, ...wishes];
      setWishes(updated);

      const updatedMyIds = [...myWishIds, generatedId];
      setMyWishIds(updatedMyIds);

      try {
        localStorage.setItem("wedding_wishes_minang", JSON.stringify(updated));
        localStorage.setItem("wedding_my_wish_ids", JSON.stringify(updatedMyIds));
      } catch {
        /* ignore */
      }
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

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
  };

  // Handle Delete (Only for user's own wishes)
  const handleDelete = async (id: string | number) => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus ucapan Anda?");
    if (!isConfirmed) return;

    setDeletingId(id);

    // Optimistic UI update
    setWishes((prev) => prev.filter((item) => String(item.id) !== String(id)));

    const updatedMyIds = myWishIds.filter((item) => item !== String(id));
    setMyWishIds(updatedMyIds);
    try {
      localStorage.setItem("wedding_my_wish_ids", JSON.stringify(updatedMyIds));
    } catch {
      /* ignore */
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("wishes").delete().eq("id", id);
        if (error) {
          console.error("Supabase delete error:", error);
          alert("Gagal menghapus: " + error.message);
          await fetchWishes();
        }
      } catch (err) {
        console.error("Delete error:", err);
        await fetchWishes();
      }
    } else {
      try {
        const remaining = wishes.filter((item) => String(item.id) !== String(id));
        localStorage.setItem("wedding_wishes_minang", JSON.stringify(remaining));
      } catch {
        /* ignore */
      }
    }

    setDeletingId(null);
  };

  // Handle Like
  const handleLike = async (id: string | number) => {
    if (likedMap[id]) return;

    setLikedMap((prev) => ({ ...prev, [id]: true }));

    // Optimistic UI update
    setWishes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );

    if (isSupabaseConfigured && supabase) {
      const target = wishes.find((w) => w.id === id);
      const newCount = (target?.likes || 0) + 1;
      try {
        await supabase.from("wishes").update({ likes: newCount }).eq("id", id);
      } catch (err) {
        console.error("Like error:", err);
      }
    } else {
      try {
        const updated = wishes.map((item) =>
          item.id === id ? { ...item, likes: item.likes + 1 } : item
        );
        localStorage.setItem("wedding_wishes_minang", JSON.stringify(updated));
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <section
      id="rsvp"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          {/* Parchment Card matching Minang Theme */}
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
                  className="text-xs font-semibold underline text-[#540C0C] hover:opacity-80 transition-opacity"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8] disabled:opacity-50"
                    style={{ borderColor: "#C9A227" }}
                  />
                </div>

                {/* Pilih Kehadiran */}
                <div>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8] text-gray-800 disabled:opacity-50"
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
                    disabled={isSubmitting}
                    className="w-full p-3 text-xs sm:text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#C9A227] bg-[#FFFDF8] resize-none disabled:opacity-50"
                    style={{ borderColor: "#C9A227" }}
                  />
                </div>

                {/* Button: "Kirim Konfirmasi" */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-maroon w-full sm:w-auto flex items-center justify-center gap-2 mx-auto disabled:opacity-60"
                    style={{ padding: "0.7rem 2.8rem" }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E5C06E]" />
                        <span>Mengirim...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#E5C06E]" />
                        <span>Kirim Konfirmasi</span>
                      </>
                    )}
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
            {wishes.map((wish) => {
              const isMyWish = myWishIds.includes(String(wish.id));
              const isDeletingThis = deletingId === wish.id;

              return (
                <div
                  key={wish.id}
                  className="p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all"
                  style={{
                    background: "#FAF0DC",
                    borderColor: "rgba(201,162,39,0.4)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center flex-wrap gap-1.5">
                      <span className="font-bold text-gray-900">{wish.name}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
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
                      <span className="text-[10px] text-gray-500">
                        {wish.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Delete button (only visible for creator of this wish) */}
                      {isMyWish && (
                        <button
                          type="button"
                          onClick={() => handleDelete(wish.id)}
                          disabled={isDeletingThis}
                          title="Hapus ucapan saya"
                          className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-100/50"
                        >
                          {isDeletingThis ? (
                            <Loader2 className="w-3 h-3 animate-spin text-red-600" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {/* Like button */}
                      <button
                        onClick={() => handleLike(wish.id)}
                        className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-rose-600 transition-colors"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            likedMap[wish.id] ? "fill-rose-600 text-rose-600" : ""
                          }`}
                        />
                        <span>{wish.likes}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-1 text-xs">{wish.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
