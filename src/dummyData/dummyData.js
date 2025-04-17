import program1 from "../assets/img/1.png";
import program2 from "../assets/img/2.png";
import program3 from "../assets/img/3.png";
import program4 from "../assets/img/4.png";

export const dataKeunggulan = [
    {
      icon: "fas fa-award",
      title: "Pengajar Kompeten",
      description:
        "Para pengajar tahsin dan tahfidz Al-Qur'an serta Rumah Qur’an Al Ayman adalah para pengajar yang kompeten serta memiliki pengalaman mengajar di bidang pengajaran Al-Qur'an.",
      color: "red",
    },
    {
      icon: "fas fa-retweet",
      title: "Interaktif",
      description:
        "Sistem pembelajaran yang berbasis online dan interaktif langsung antar pengajar dan murid.",
      color: "red",
    },
    {
      icon: "fas fa-solid fa-headset",
      title: "Daurah/Kajian",
      description:
        "Menyelenggarakan dauroh/kajian rutin ilmu syar’i dan ilmu yang bermanfaat untuk ummat.",
      color: "red",
    },
  ];
  

export const dataProgram = [
  {
    image: program1,
    title: "Tahsin Al Qur'an",
    description:
      "Program belajar membaca Al Qur’an dengan baik dan benar sesuai kaidah tajwid bersama pengajar berpengalaman.",
  },
  {
    image: program2,
    title: "Tahfidz Al Qur'an",
    description:
      "Program intensif menghafal Al Qur’an dengan target yang disesuaikan dan bimbingan tahfidz secara berkala.",
  },
  {
    image: program3,
    title: "Kelas Bahasa Arab",
    description:
      "Belajar Bahasa Arab dari dasar dengan pendekatan yang mudah dipahami dan metode yang menyenangkan.",
  },
  {
    image: program4,
    title: "Dauroh/Kajian Rutin Ilmu Syar’i",
    description:
      "Menghadirkan kajian ilmiah secara rutin dengan pembahasan ilmu syar’i yang aplikatif dan bermanfaat bagi umat.",
  },
];


export const dummyDataKelasIslam = [
    {
      title: "Belajar Tajwid Dasar",
      description: "Memahami Makharijul Huruf dan Sifatul Huruf untuk membaca Al-Qur'an dengan benar.",
      buttonText: "Mulai Belajar",
      onClick: () => console.log("Mulai belajar Tajwid Dasar"),
    },
    {
      title: "Fikih Ibadah Harian",
      description: "Mempelajari tata cara pelaksanaan ibadah sehari-hari seperti shalat, puasa, dan lainnya sesuai sunnah.",
      buttonText: "Lihat Detail",
      onClick: () => console.log("Lihat detail Fikih Ibadah Harian"),
    },
    {
      title: "Kisah-Kisah Para Nabi",
      description: "Menyimak dan mengambil pelajaran dari perjalanan hidup para nabi dan rasul utusan Allah.",
      buttonText: "Baca Kisah",
      onClick: () => console.log("Baca kisah para nabi"),
    },
    {
      title: "Akhlak Mulia dalam Islam",
      description: "Membangun karakter dan perilaku Islami berdasarkan Al-Qur'an dan Hadis.",
      buttonText: "Pelajari Akhlak",
      onClick: () => console.log("Pelajari Akhlak Mulia"),
    },
    {
      title: "Hafalan Juz Amma",
      description: "Program bimbingan untuk menghafal surah-surah pendek dalam Juz Amma.",
      buttonText: "Daftar Hafalan",
      onClick: () => console.log("Daftar program hafalan Juz Amma"),
    },
    {
      title: "Sirah Nabawiyah",
      description: "Mempelajari sejarah kehidupan Nabi Muhammad SAW sebagai teladan utama umat Islam.",
      buttonText: "Telusuri Sirah",
      onClick: () => console.log("Telusuri Sirah Nabawiyah"),
    },
  ];
  