import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Access token required' }, { status: 401 });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  if (!token) {
    return Response.json({ error: 'Access token required' }, { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  const { id, email, created_at } = data.user;

  return Response.json({ id, email, created_at }, { status: 200 });
}
