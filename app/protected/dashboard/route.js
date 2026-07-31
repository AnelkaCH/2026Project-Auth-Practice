import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  const auth = await requireAuth(request);

  if (auth.response) {
    return auth.response;
  }

  return Response.json(
    { message: `Welcome back, ${auth.user.email}! This is your private dashboard.` },
    { status: 200 }
  );
}
