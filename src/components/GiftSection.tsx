"use client";

import React, { useState } from "react";
import { Gift, Copy, Check, Building, MapPin, Smartphone } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import ScrollReveal from "@/components/ScrollReveal";
import { ParchmentCard } from "@/components/MinangDecorations";

export default function GiftSection() {
  const [showAccounts, setShowAccounts] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopy = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleCopyAddress = () => {
    const fullAddress = `${weddingData.giftAddress.recipient} (${weddingData.giftAddress.phone})\n${weddingData.giftAddress.address}, ${weddingData.giftAddress.city}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section
      id="hadiah"
      className="py-16 px-4 relative overflow-hidden"
      style={{ background: "#FDF8EF" }}
    >
      <div className="max-w-xl mx-auto">
        <ScrollReveal animation="fade-up" threshold={0.15}>
          {/* Parchment Card matching Reference #9 */}
          <ParchmentCard className="text-center py-8 px-6 sm:px-10">
            {/* Title */}
            <h2
              className="font-serif italic text-2xl sm:text-3xl mb-3"
              style={{ color: "#540C0C" }}
            >
              Kirim Hadiah
            </h2>

            {/* Description matching Reference #9 text */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed max-w-md mx-auto mb-6">
              Doa restu Bapak/Ibu/Saudara/i merupakan karunia yang sangat berarti bagi kami.
              Namun jika memberi adalah ungkapan tanda kasih, Bapak/Ibu/Saudara/i dapat memberi kado
              secara digital melalui tombol di bawah ini.
            </p>

            {/* Button: "Kirim Hadiah" matching Reference #9 & #3 */}
            <button
              onClick={() => setShowAccounts(!showAccounts)}
              className="btn-maroon"
            >
              <Gift className="w-4 h-4 text-[#E5C06E]" />
              <span>{showAccounts ? "Tutup Rekening Hadiah" : "Kirim Hadiah"}</span>
            </button>

            {/* Expanded Digital Gifts / Bank Accounts */}
            {showAccounts && (
              <div className="mt-8 pt-8 space-y-6 text-left border-t border-[#C9A227]/40 animate-fade-in">
                {/* Bank Accounts & E-Wallet */}
                <div className="space-y-4">
                  {weddingData.gifts.map((gift) => {
                    const isCopied = copiedBank === gift.bankName;
                    const isWallet = gift.bankName.toLowerCase().includes("dana") || gift.bankName.toLowerCase().includes("gopay") || gift.bankName.toLowerCase().includes("ovo");
                    return (
                      <div
                        key={gift.bankName}
                        className="rounded-xl p-4 border bg-[#FAF0DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        style={{ borderColor: "#C9A227" }}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {isWallet ? (
                              <Smartphone className="w-4 h-4 text-[#540C0C]" />
                            ) : (
                              <Building className="w-4 h-4 text-[#540C0C]" />
                            )}
                            <span className="font-serif font-bold text-sm text-gray-900">
                              {gift.bankName}
                            </span>
                            {isWallet && (
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1A4A2E]/15 text-[#1A4A2E] border border-[#1A4A2E]/30">
                                E-Wallet
                              </span>
                            )}
                          </div>
                          <p className="font-mono text-base font-bold text-gray-900 tracking-wider">
                            {gift.accountNumber}
                          </p>
                          <p className="text-xs text-gray-600">a.n. {gift.accountHolder}</p>
                        </div>

                        <button
                          onClick={() => handleCopy(gift.accountNumber, gift.bankName)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{
                            background: isCopied ? "#1A4A2E" : "#540C0C",
                            color: "#FAF0DC",
                            border: "1px solid #C9A227",
                          }}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-[#E5C06E]" />
                              <span>{isWallet ? "Salin No. HP / DANA" : "Salin No. Rekening"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Physical Gift Address */}
                <div
                  className="rounded-xl p-4 border bg-[#FAF0DC]"
                  style={{ borderColor: "#C9A227" }}
                >
                  <div className="flex items-center gap-2 mb-2 text-[#540C0C]">
                    <MapPin className="w-4 h-4" />
                    <span className="font-serif font-bold text-sm">Kirim Kado Fisik</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-3">
                    <strong>Penerima:</strong> {weddingData.giftAddress.recipient} (
                    {weddingData.giftAddress.phone})
                    <br />
                    {weddingData.giftAddress.address}, {weddingData.giftAddress.city}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all"
                    style={{
                      background: copiedAddress ? "#1A4A2E" : "#540C0C",
                      color: "#FAF0DC",
                      borderColor: "#C9A227",
                    }}
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E5C06E]" />
                        <span>Salin Alamat Lengkap</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </ParchmentCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
