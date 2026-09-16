import Link from "next/link";
import { books } from "@/data/books";

export default async function OrderPage(props: { params: Promise<{ orderId: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const orderId = params.orderId;
  const bookId = searchParams.bookId as string;
  const email = searchParams.email as string;
  const name = searchParams.name as string;
  
  const book = books.find(b => b.id === bookId);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">คำสั่งซื้อ <span className="text-blue-600">PENDING</span></h1>
          <p className="text-gray-600">รอการชำระเงินสำหรับหมายเลขคำสั่งซื้อ: <strong>{orderId}</strong></p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รายละเอียดลูกค้า</h2>
          <p className="text-gray-700 mb-1"><strong>ชื่อ:</strong> {name}</p>
          <p className="text-gray-700 mb-4"><strong>อีเมล:</strong> {email}</p>
          
          <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">รายการหนังสือ</h2>
          {book ? (
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{book.title}</span>
              <span className="text-gray-900 font-bold">฿{book.price}</span>
            </div>
          ) : (
            <p className="text-red-500">ไม่พบข้อมูลหนังสือ</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href={`/payment/${orderId}?bookId=${bookId}&email=${email}&name=${name}`}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            ไปที่หน้าชำระเงิน
          </Link>
          <Link 
            href="/"
            className="w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
          >
            กลับหน้าร้าน
          </Link>
        </div>
      </div>
    </main>
  );
}
