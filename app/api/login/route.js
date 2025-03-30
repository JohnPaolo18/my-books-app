import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    // 1) Parse credentials from request body
    const { username, password } = await request.json();

    // 2) Validate (in real apps, check a DB)
    if (username !== 'admin' || password !== '123') {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3) Create a token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 4) Return token
    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
