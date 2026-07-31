export async function GET(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Access token required' }, { status: 401 });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  if (!token) {
    return Response.json({ error: 'Access token required' }, { status: 401 });
  }

  return Response.json({ message: 'Profile data (verification coming in the next stage)' }, { status: 200 });
}
