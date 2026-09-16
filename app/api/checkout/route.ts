import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { bookId, name, email } = await request.json();
    const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Real DB Insert
      const { error } = await supabase
        .from('orders')
        .insert([{ id: orderId, book_id: bookId, user_name: name, user_email: email, status: 'PENDING' }]);

      if (error) throw error;
    } else {
      // Mock mode
      console.log(`[MOCK DB] Created Order ${orderId} for ${email}`);
    }
    
    return NextResponse.json({ success: true, orderId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
