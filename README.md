# E-book Shop: ระบบจำลองร้านขายหนังสือ E-book

โปรเจกต์นี้เป็น Web Application สำหรับร้านขายหนังสือ E-book ที่ถูกพัฒนาขึ้นด้วย **Next.js** และจัดทำตามใบงาน Vibe Coding โดยเน้นไปที่ระบบฝั่งผู้ใช้งาน (Customer-facing) 

## 🌟 ฟีเจอร์และการทำงานของระบบ

1. **หน้าร้าน (Storefront):** แสดงหนังสือ E-book 3 เล่ม (Media Player, Tarot App, SQLite Manager Pro) พร้อมรูปปกและราคา
2. **หน้า Checkout:** ให้ผู้ใช้กรอกชื่อและอีเมล ระบบจะทำการสร้างหมายเลขคำสั่งซื้อ (Order ID) และตั้งสถานะเป็น `PENDING`
3. **ระบบจำลองการชำระเงิน (Mock Payment):**
   - มีป้ายแจ้งเตือน **"DEMO ONLY"** อย่างชัดเจน 
   - เมื่อกดปุ่ม "จำลองชำระเงินสำเร็จ" ระบบจะเปลี่ยนสถานะเป็น `PAID` 
4. **หน้าติดตามสถานะ (Track Order):** 
   - แสดงสถานะคำสั่งซื้อ
   - เมื่อสถานะเป็น PAID จะมีการแจ้งเตือนว่าได้ทำการส่งลิงก์ดาวน์โหลด E-book ไปยังอีเมลของผู้ใช้งานแล้ว (รองรับการจำลองส่งอีเมล)

> **หมายเหตุ:** โปรเจกต์นี้รองรับการทำงานใน **Mock Mode** อย่างสมบูรณ์ หากยังไม่ได้เชื่อมต่อฐานข้อมูล (Supabase) หรือ Email API (Resend) ระบบจะใช้ข้อมูลจำลองเพื่อให้สามารถสาธิตการทำงานตั้งแต่ต้นจนจบได้โดยไม่เกิดข้อผิดพลาด

---

## 🚀 การนำไปใช้งานจริง (Deployment)

### 1. การนำขึ้น Vercel (Production URL)
สามารถ Deploy โค้ดนี้ขึ้น Vercel ได้อย่างง่ายดาย:
- นำโค้ดอัปโหลดขึ้น GitHub Repository
- ล็อกอินเข้า Vercel > กด Add New Project > เลือก Import จาก GitHub
- ตั้งค่า Environment Variables (ถ้ามี API Key ของ Supabase/Resend) ได้แก่:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
- กด **Deploy** จะได้ลิงก์ Production URL มาใช้งาน (หากไม่มี API Key ให้ Deploy แบบไม่ใส่ตัวแปร ระบบจะทำงานใน Mock Mode อัตโนมัติ)

### 2. การสร้าง Mobile App ด้วย MIT App Inventor
นำ Web Application ไปครอบเป็น Android App (.APK):
1. ไปที่เว็บไซต์ **MIT App Inventor** และสร้างโปรเจกต์ใหม่
2. ตั้งค่า Screen1 ให้มี Sizing แบบ `Responsive`
3. ลาก Component **WebViewer** ลงมาบนหน้าจอ ปรับขนาดเป็น Fill Parent
4. นำ Vercel Production URL ไปใส่ในช่อง **HomeUrl**
5. เขียนบล็อก (Blocks) จัดการปุ่มย้อนกลับ (Back Button):
   - `when Screen1.BackPressed`
   - `if WebViewer1.CanGoBack then call WebViewer1.GoBack`
   - `else close application`
6. ไปที่เมนู **Build > Android App (.apk)** เพื่อสร้างแอปพลิเคชันสำหรับติดตั้งบนมือถือ
