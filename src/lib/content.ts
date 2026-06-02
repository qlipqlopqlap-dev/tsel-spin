/** Static Indonesian copy + campaign constants, kept in one place. */

export const CAMPAIGN = {
  brand: 'Telkomsel',
  title: 'Undian Tiket Kuota',
  /** Countdown duration in seconds (5 minutes, matching the live site). */
  countdownSeconds: 5 * 60,
  validUntil: 'Berlaku sampai 31 Des 2026',
  ticketCount: 6,
  callCenter: '188',
} as const

export interface Step {
  title: string
  desc: string
}

export const STEPS: Step[] = [
  { title: 'Pilih Tiket', desc: 'Pilih 1 dari 6 kartu tiket yang tersedia di bawah.' },
  { title: 'Gosok Kartu', desc: 'Gosok permukaan kartu untuk membuka hadiahmu.' },
  { title: 'Klaim Hadiah', desc: 'Tekan KLAIM, hadiah langsung dikirim ke nomormu.' },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'Apa itu Undian Tiket Kuota Telkomsel?',
    a: 'Program apresiasi untuk pelanggan setia Telkomsel. Pelanggan terpilih mendapat 1 tiket untuk digosok dan berkesempatan memenangkan kuota, pulsa, voucher belanja, hingga iPhone 17.',
  },
  {
    q: 'Bagaimana cara klaim hadiahnya?',
    a: 'Gosok kartu tiket di halaman ini. Hadiah akan langsung muncul, lalu tekan tombol KLAIM untuk menukarkannya ke nomor Telkomsel kamu.',
  },
  {
    q: 'Siapa saja yang bisa ikut?',
    a: 'Semua pelanggan Telkomsel prabayar (simPATI, Kartu As, by.U) dan kartuHalo yang menerima tautan undian ini.',
  },
  {
    q: 'Apakah ada biaya untuk ikut?',
    a: 'Gratis. Tidak ada biaya untuk menggosok tiket maupun mengklaim hadiah.',
  },
  {
    q: 'Berapa tiket yang saya dapat?',
    a: 'Setiap pelanggan mendapat 1 tiket per periode. Pilih salah satu kartu, kartu lainnya akan terkunci otomatis.',
  },
  {
    q: 'Kapan hadiah masuk ke nomor saya?',
    a: 'Kuota dan pulsa masuk maksimal 1x24 jam setelah klaim. Untuk hadiah utama seperti iPhone 17, tim Telkomsel akan menghubungi pemenang.',
  },
  {
    q: 'Bagaimana jika hitungan mundur habis?',
    a: 'Tiket akan hangus dan kamu perlu menunggu periode undian berikutnya. Pastikan klaim sebelum waktu habis.',
  },
  {
    q: 'Ke mana saya menghubungi bila ada kendala?',
    a: 'Hubungi Call Center Telkomsel di 188 atau kunjungi GraPARI terdekat.',
  },
]
