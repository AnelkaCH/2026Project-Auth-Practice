import { supabase } from '@/lib/supabase';

export async function requireAuth(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { response: Response.json({ error: 'Access token required' }, { status: 401 }) };
  }

  const token = authHeader.slice('Bearer '.length).trim();

  if (!token) {
    return { response: Response.json({ error: 'Access token required' }, { status: 401 }) };
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return { response: Response.json({ error: 'Invalid or expired token' }, { status: 401 }) };
  }

  return { user: data.user, token };
}
