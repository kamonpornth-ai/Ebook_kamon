export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
}

export const books: Book[] = [
  {
    id: "b1",
    title: "Media Player",
    description: "คู่มือการสร้างและพัฒนาโปรแกรมเล่นเพลงและวิดีโอแบบครบวงจร ครอบคลุมการจัดการ Playlist และ UI สมัยใหม่",
    price: 299,
    coverImage: "/covers/mediaplayer.jpg",
  },
  {
    id: "b2",
    title: "Tarot App",
    description: "เรียนรู้การพัฒนาแอปพลิเคชันทำนายไพ่ทาโรต์ พร้อมระบบสุ่มไพ่ การอ่านความหมายไพ่ และดีไซน์ที่ดูลึกลับน่าสนใจ",
    price: 199,
    coverImage: "/covers/tarotapp.jpg",
  },
  {
    id: "b3",
    title: "SQLite Manager Pro",
    description: "การสร้างโปรแกรมจัดการฐานข้อมูล SQLite แบบมืออาชีพ รองรับการเขียน Query และแสดงผลตารางข้อมูลแบบ Real-time",
    price: 250,
    coverImage: "/covers/sqlitemanager.jpg",
  }
];
