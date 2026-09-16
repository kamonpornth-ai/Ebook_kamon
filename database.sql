-- คำสั่ง SQL สำหรับนำไปใช้รันในหน้า SQL Editor ของ Supabase
-- เพื่อสร้างตารางสำหรับเก็บข้อมูล Order

-- 1. สร้างตาราง orders
CREATE TABLE orders (
  id text PRIMARY KEY,
  book_id text NOT NULL,
  user_name text NOT NULL,
  user_email text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. เปิดใช้งาน Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. อนุญาตให้ทุกคนสามารถ Insert ข้อมูลได้ (สำหรับการสั่งซื้อ)
CREATE POLICY "Enable insert for all users" 
ON "public"."orders" 
AS PERMISSIVE 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. อนุญาตให้ทุกคนสามารถอ่านข้อมูลได้ (สำหรับหน้า Track Order)
CREATE POLICY "Enable read for all users" 
ON "public"."orders" 
AS PERMISSIVE 
FOR SELECT 
TO public 
USING (true);

-- ==========================================
-- สำหรับ Storage Bucket ของ E-book
-- ==========================================
-- 1. ไปที่เมนู Storage ใน Supabase
-- 2. กดปุ่ม New bucket ตั้งชื่อว่า "ebooks"
-- 3. ปิดการตั้งค่า "Public bucket" (เพื่อให้เป็น Private bucket ป้องกันคนดาวน์โหลดตรง)
-- 4. อัปโหลดไฟล์ PDF สมมติ เช่น "b1.pdf", "b2.pdf", "b3.pdf" ลงใน bucket นี้
