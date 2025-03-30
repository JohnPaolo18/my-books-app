import pool from '../../../lib/db';

export async function DELETE(request) {
  try {
    const { book_id } = await request.json();

    const connection = await pool.getConnection();
    await connection.query('DELETE FROM starred_books WHERE book_id = ?', [book_id]);
    connection.release();

    return new Response(JSON.stringify({ message: 'Book unstarred successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error unstarring book:', error);
    return new Response(JSON.stringify({ message: 'Failed to unstar book' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}