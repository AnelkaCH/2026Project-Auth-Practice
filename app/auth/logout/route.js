import { createClient } from '@supabase/supabase-js';
import { requireAuth } from '@/lib/auth';

export async function POST(request) {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  const userClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

  const { error: sessionError } = await userClient.auth.setSession({
    access_token: auth.token,
    refresh_token: auth.token,
  });

  if (sessionError) {
    return Response.json({ error: 'Logout failed' }, { status: 500 });
  }

  const { error: signOutError } = await userClient.auth.signOut();

  if (signOutError) {
    return Response.json({ error: 'Logout failed' }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
