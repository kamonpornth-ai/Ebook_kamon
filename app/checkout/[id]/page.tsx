"use client";

import { useState, useEffect, use } from "react";
import { books, Book } from "@/data/books";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    const foundBook = books.find(b => b.id === unwrappedParams.id);
    if (foundBook) {
      setBook(foundBook);
    }
  }, [unwrappedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: book.id,
          name: formData.name,
          email: formData.email
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // ไปยังหน้าสรุปคำสั่งซื้อ (Order)
        router.push(`/order/${data.orderId}?bookId=${book.id}&email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.name)}`);
      } else {
        alert("เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถสร้างคำสั่งซื้อได้");
    }
  };

  if (!book) return <div className="min-h-screen p-8 flex justify-center items-center">กำลังโหลด...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; กลับไปหน้าร้าน
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">รายละเอียดการสั่งซื้อ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4">สรุปรายการ</h2>
            <div className="flex gap-4 mb-4 pb-4 border-b">
              <img src={book.coverImage} alt={book.title} className="w-24 h-36 object-cover rounded" />
              <div>
                <h3 className="font-medium text-gray-900 line-clamp-2">{book.title}</h3>
                <p className="text-blue-600 font-bold mt-2">฿{book.price}</p>
              </div>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span>ยอดชำระสุทธิ</span>
              <span className="text-blue-600">฿{book.price}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">ข้อมูลผู้ซื้อ</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ชื่อ - นามสกุล</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="สมชาย ใจดี"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">อีเมล (สำหรับจัดส่ง E-book)</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="somchai@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ยืนยันคำสั่งซื้อ
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
