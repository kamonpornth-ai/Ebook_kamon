import Link from "next/link";
import { books } from "@/data/books";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">E-book Shop</h1>
          <p className="text-lg text-gray-600">เลือกซื้อหนังสือ E-book ที่น่าสนใจและนำไปใช้ได้จริง</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 w-full bg-gray-200">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{book.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-blue-600">฿{book.price}</span>
                  <Link 
                    href={`/checkout/${book.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    สั่งซื้อเลย
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
