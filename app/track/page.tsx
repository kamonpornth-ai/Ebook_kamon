"use client";

import { useState, use } from "react";
import Link from "next/link";

export default function TrackPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const unwrappedSearchParams = use(searchParams);
  
  // If redirected from payment page
  const initialOrderId = unwrappedSearchParams.orderId as string || "";
  const initialEmail = unwrappedSearchParams.email as string || "";
  const initialStatus = unwrappedSearchParams.status as string || "";
  
  const [orderId, setOrderId] = useState(initialOrderId);
  const [email, setEmail] = useState(initialEmail);
  const [hasSearched, setHasSearched] = useState(!!initialOrderId);
  const [status, setStatus] = useState(initialStatus || "PENDING"); // Mock status

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/track?orderId=${orderId}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      
      if (data.success) {
        setStatus(data.status);
        setHasSearched(true);
      } else {
        alert("ไม่พบข้อมูลคำสั่งซื้อ หรืออีเมลไม่ถูกต้อง");
        setHasSearched(false);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; กลับไปหน้าร้าน
        </Link>
        
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">ติดตามสถานะคำสั่งซื้อ</h1>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              placeholder="หมายเลขคำสั่งซื้อ (เช่น ORD-12345)" 
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="อีเมลที่ใช้สั่งซื้อ" 
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {hasSearched && (
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
            {status === "PAID" ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">ชำระเงินสำเร็จ (PAID)</h2>
                <p className="text-gray-600 mb-6">
                  ขอบคุณที่สั่งซื้อหนังสือกับเรา ระบบได้ส่งลิงก์สำหรับดาวน์โหลด E-book ไปยังอีเมล <strong>{email}</strong> แล้ว
                </p>
                <div className="p-4 bg-gray-50 rounded-lg text-left">
                  <p className="text-sm text-gray-500 mb-2">จำลองการส่งอีเมล (สำหรับทดสอบระบบ):</p>
                  <p className="font-mono text-sm text-green-700 break-all">
                    [MOCK EMAIL SENT] To: {email} | Subject: Your E-book Download Link | Body: Please download your book at https://example.com/download/mock
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">รอการชำระเงิน (PENDING)</h2>
                <p className="text-gray-600 mb-6">
                  คำสั่งซื้อ <strong>{orderId}</strong> กำลังรอการชำระเงิน
                </p>
                <Link 
                  href={`/payment/${orderId}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  ไปหน้าชำระเงิน
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
