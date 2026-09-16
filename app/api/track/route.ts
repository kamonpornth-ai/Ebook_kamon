import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const email = searchParams.get('email');

  if (!orderId || !email) {
    return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
  }

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data: order, error } = await supabase
        .from('orders')
        .select('id, status, user_email')
        .eq('id', orderId)
        .eq('user_email', email)
        .single();

      if (error) throw error;
      
      return NextResponse.json({ success: true, status: order.status });
    } else {
      // Mock fallback
      return NextResponse.json({ success: true, status: 'PENDING (MOCK)' });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
