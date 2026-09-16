"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { books } from "@/data/books";
import Link from "next/link";

export default function MockPaymentPage({ params, searchParams }: { params: Promise<{ orderId: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const unwrappedParams = use(params);
  const unwrappedSearchParams = use(searchParams);
  const router = useRouter();
  
  const orderId = unwrappedParams.orderId;
  const bookId = unwrappedSearchParams.bookId as string;
  const email = unwrappedSearchParams.email as string;
  
  const book = books.find(b => b.id === bookId);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleMockPayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          email,
          bookId
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert("จำลองการชำระเงินสำเร็จ! สถานะคือ PAID");
        router.push(`/track?orderId=${orderId}&email=${encodeURIComponent(email)}&status=PAID`);
      } else {
        alert("เกิดข้อผิดพลาดในการชำระเงิน: " + data.error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      alert("การเชื่อมต่อมีปัญหา");
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border-2 border-red-200 relative overflow-hidden">
        {/* DEMO ONLY Badge */}
        <div className="absolute top-4 right-[-35px] bg-red-500 text-white font-bold text-xs py-1 px-10 transform rotate-45 shadow-sm">
          DEMO ONLY
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">หน้าชำระเงิน (จำลอง)</h1>
          <p className="text-gray-500 text-sm">ระบบนี้เป็นเพียงการสาธิต ไม่มีการหักเงินจริง</p>
        </div>

        <div className="mb-8 p-4 bg-blue-50 text-blue-900 rounded-lg border border-blue-100">
          <p className="mb-1 text-sm">หมายเลขคำสั่งซื้อ: <strong>{orderId}</strong></p>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-blue-200">
            <span className="font-medium">ยอดชำระสุทธิ</span>
            <span className="text-xl font-bold text-blue-700">฿{book?.price || "0.00"}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50">
            <img src="https://placehold.co/150x150/ffffff/9ca3af?text=Mock+QR" alt="Mock QR" className="mx-auto mb-2" />
            <p className="text-xs text-gray-500">สแกน QR Code จำลองเพื่อชำระเงิน</p>
          </div>

          <button 
            onClick={handleMockPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            จำลองชำระเงินสำเร็จ (PAID)
          </button>
          
          <Link 
            href={`/order/${orderId}?bookId=${bookId}&email=${email}`}
            className="block text-center text-gray-500 text-sm hover:underline mt-4"
          >
            ยกเลิกการชำระเงิน
          </Link>
        </div>
      </div>
    </main>
  );
}
