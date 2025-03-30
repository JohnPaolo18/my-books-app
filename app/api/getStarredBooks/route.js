// app/api/getStarredBooks/route.js
import pool from '../../../lib/db';

export async function GET(request) {
  try {
    // Grab the book_id from the query string
    const url = new URL(request.url);
    const bookId = url.searchParams.get('book_id');

    const connection = await pool.getConnection();

    if (bookId) {
      // Filter by book_id
      const [rows] = await connection.query(
        'SELECT * FROM starred_books WHERE book_id = ?',
        [bookId]
      );
      connection.release();

      if (rows.length === 0) {
        return new Response(JSON.stringify({ message: 'Book not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify(rows[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // No book_id provided: return all
      const [rows] = await connection.query('SELECT * FROM starred_books');
      connection.release();

      return new Response(JSON.stringify(rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to fetch book' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
