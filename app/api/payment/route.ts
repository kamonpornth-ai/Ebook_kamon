import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const { orderId, email, bookId } = await request.json();

    let downloadLink = 'https://example.com/mock-download-link';

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      // 1. Update order status to PAID
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ status: 'PAID' })
        .eq('id', orderId);

      if (updateError) throw updateError;
      
      // 2. Generate signed URL for E-book from private bucket
      // Assuming bucket is named 'ebooks' and file is named '{bookId}.pdf'
      const { data: signedUrlData, error: signError } = await supabaseAdmin
        .storage
        .from('ebooks')
        .createSignedUrl(`${bookId}.pdf`, 60 * 60); // 1 hour expiry

      if (!signError && signedUrlData) {
        downloadLink = signedUrlData.signedUrl;
      }
    } else {
      console.log(`[MOCK DB] Updated Order ${orderId} to PAID`);
    }

    // 3. Send email with Resend
    if (resend) {
      await resend.emails.send({
        from: 'E-book Shop <onboarding@resend.dev>', // Change this to verified domain in production
        to: email,
        subject: 'ขอบคุณที่สั่งซื้อหนังสือ! E-book ของคุณพร้อมแล้ว',
        html: `
          <h1>ชำระเงินสำเร็จ</h1>
          <p>ขอบคุณที่สั่งซื้อ E-book กับเราครับ</p>
          <p>หมายเลขคำสั่งซื้อ: <strong>${orderId}</strong></p>
          <p>ลิงก์ดาวน์โหลดของคุณ (มีอายุการใช้งาน 1 ชั่วโมง):</p>
          <a href="${downloadLink}" style="display:inline-block;padding:10px 20px;background-color:#2563eb;color:white;text-decoration:none;border-radius:5px;">คลิกเพื่อดาวน์โหลด E-book</a>
        `
      });
      console.log(`[EMAIL] Sent actual email to ${email}`);
    } else {
      console.log(`[MOCK EMAIL] Sent to ${email} with link: ${downloadLink}`);
    }
    
    return NextResponse.json({ success: true, orderId, status: 'PAID' });
  } catch (err: any) {
    console.error("Payment API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
