export interface WeddingData {
  groom: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    instagram: string;
    photo: string;
    bio: string;
  };
  bride: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    instagram: string;
    photo: string;
    bio: string;
  };
  eventDate: string; // ISO string for countdown
  quote: {
    arabic: string;
    translation: string;
    source: string;
  };
  events: {
    id: string;
    title: string;
    date: string;
    time: string;
    zone: string;
    venue: string;
    address: string;
    mapsUrl: string;
    gmapsEmbed?: string;
  }[];
  stories: {
    year: string;
    title: string;
    description: string;
    image: string;
  }[];
  gallery: {
    id: number;
    url: string;
    title: string;
    span?: string;
  }[];
  gifts: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    logo: string;
  }[];
  qris?: {
    imageUrl: string;
    name: string;
  };
  giftAddress: {
    recipient: string;
    phone: string;
    address: string;
    city: string;
  };
  audio: {
    url: string;
    title: string;
    artist: string;
  };
  liveStream?: {
    url: string;
    platform: string;
    time: string;
  };
}

export const weddingData: WeddingData = {
  groom: {
    name: "Jefri",
    fullName: "Jefri Oktafio",
    father: "H. Azwar (Alm.)",
    mother: "Hj. Burniati, S.Pd.",
    instagram: "",
    photo: "/groom-jefri.jpg",
    bio: "Putra dari H. Azwar (Alm.) & Hj. Burniati, S.Pd.",
  },
  bride: {
    name: "Shalsa",
    fullName: "Shalsa Zya Salman",
    father: "Salman",
    mother: "Solma",
    instagram: "",
    photo: "/bride-shalsa.jpg",
    bio: "Putri dari Bapak Salman & Ibu Solma",
  },
  eventDate: "2026-10-09T10:00:00+07:00",
  quote: {
    arabic: "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      date: "Kamis, 08 Oktober 2026",
      time: "13.00",
      zone: "WIB",
      venue: "Rumah Mempelai Wanita",
      address: "Pantai Torpedo Ujung Labung, Tiku V Jorong, Kec. Tanjung Mutiara, Kab. Agam, Sumatera Barat",
      mapsUrl:
        "https://www.google.com/maps/place/0%C2%B021'03.2%22S+99%C2%B053'32.1%22E/@-0.3508973,99.8896828,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.3508973!4d99.8922577?hl=en&entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
      gmapsEmbed: "https://maps.google.com/maps?q=-0.3508973,99.8922577&output=embed",
    },
    {
      id: "resepsi",
      title: "Resepsi",
      date: "Jumat, 09 Oktober 2026",
      time: "10.00",
      zone: "WIB - Selesai",
      venue: "Rumah Mempelai Wanita",
      address: "Pantai Torpedo Ujung Labung, Tiku V Jorong, Kec. Tanjung Mutiara, Kab. Agam, Sumatera Barat",
      mapsUrl:
        "https://www.google.com/maps/place/0%C2%B021'03.2%22S+99%C2%B053'32.1%22E/@-0.3508973,99.8896828,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.3508973!4d99.8922577?hl=en&entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
      gmapsEmbed: "https://maps.google.com/maps?q=-0.3508973,99.8922577&output=embed",
    },
  ],
  stories: [
    {
      year: "Bab I",
      title: "Tentang Bertahan",
      description:
        "Jika perjalanan ini harus diceritakan dari awal, mungkin tak akan selesai dalam sekali ucap. Sebab bagi kami, cinta bukan sekadar tentang pertemuan, melainkan tentang memilih tetap tinggal saat banyak alasan untuk pergi.\n\nKami hanyalah dua manusia biasa, dengan segala kurang dan rapuhnya, yang terus belajar saling menjaga. Dalam setiap musim, kami percaya takdir mempertemukan bukan hanya untuk singgah, tetapi untuk saling menguatkan.",
      image: "/gallery/gallery-1.jpg",
    },
    {
      year: "Bab II",
      title: "Ujian & Bukti",
      description:
        "Perjalanan ini tidak hanya dipenuhi bahagia, tetapi juga air mata, ragu, dan waktu yang menguji keyakinan. Ada saat langkah terasa berat, namun cinta selalu menemukan jalan untuk menguatkan.\n\nKami bertahan bukan karena semuanya mudah, melainkan karena doa yang tak putus, hati yang tetap memilih, dan keyakinan bahwa setiap luka akan bermuara pada restu. Hingga akhirnya, dua keluarga dipersatukan dalam harap yang sama.",
      image: "/gallery/gallery-2.jpg",
    },
    {
      year: "Bab III",
      title: "Takdir & Keyakinan",
      description:
        "Kami mengerti, tidak semua jalan berjalan mudah, dan tidak setiap doa dijawab secepat harapan. Namun di setiap jeda, kami belajar percaya pada Sang Maha Cinta—yang selalu tahu ke mana hati harus pulang.\n\nKami meyakini bahwa takdir terbaik selalu menemukan jalannya. Kini, dengan penuh syukur, kami menantikan hari sakral ketika dua jiwa dipersatukan dalam satu ikatan suci.",
      image: "/gallery/gallery-4.jpg",
    },
    {
      year: "Bab IV",
      title: "Menuju Hari Itu",
      description:
        "Sebentar lagi, kisah ini akan melangkah ke babak baru—saat dua perjalanan menjadi satu tujuan, dan dua hati berjalan bersama dalam naungan cinta-Nya.\n\nDoakan kami, agar setiap langkah ke depan selalu dipeluk oleh lembutnya takdir, dikuatkan oleh kasih Sang Maha Cinta, dan diberkahi kebahagiaan yang tak lekang oleh waktu.",
      image: "/gallery/gallery-5.jpg",
    },
  ],
  gallery: [
    {
      id: 1,
      url: "/gallery/gallery-1.jpg",
      title: "Langkah Bersama",
      span: "col-span-2 sm:col-span-2 row-span-2",
    },
    {
      id: 2,
      url: "/gallery/gallery-2.jpg",
      title: "Saling Melengkapi",
    },
    {
      id: 3,
      url: "/gallery/gallery-shalsa.jpg",
      title: "Senyum Bahagia",
    },
    {
      id: 4,
      url: "/gallery/gallery-3.jpg",
      title: "Menatap Masa Depan",
    },
    {
      id: 5,
      url: "/gallery/gallery-4.jpg",
      title: "Ceria Bersamamu",
    },
    {
      id: 6,
      url: "/gallery/gallery-5.jpg",
      title: "Tawa & Bahagia",
    },
  ],
  gifts: [
    {
      bankName: "Bank Nagari Syariah",
      accountNumber: "71000201088832",
      accountHolder: "Shalsa Zya Salman",
      logo: "Nagari",
    },
    {
      bankName: "SeaBank",
      accountNumber: "901480620197",
      accountHolder: "Shalsa Zya Salman",
      logo: "SeaBank",
    },
    {
      bankName: "DANA",
      accountNumber: "081267701887",
      accountHolder: "Shalsa Zya Salman",
      logo: "DANA",
    },
  ],
  qris: {
    imageUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WEDDING-GIFT-SHALSA-JEFRI",
    name: "QRIS Wedding Gift",
  },
  giftAddress: {
    recipient: "Shalsa & Jefri",
    phone: "-",
    address: "Pantai Torpedo Ujung Labung, Tiku V Jorong, Kec. Tanjung Mutiara",
    city: "Kabupaten Agam, Sumatera Barat",
  },
  audio: {
    url: "/backsound.mp3",
    title: "Wedding Backsound",
    artist: "Shalsa & Jefri",
  },
  liveStream: {
    url: "https://youtube.com/live",
    platform: "YouTube Live",
    time: "08 Oktober 2026 • 13:00 WIB",
  },
};
