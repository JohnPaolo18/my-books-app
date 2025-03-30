// app/api/deleteBook/route.js
import pool from '../../../lib/db';

export async function DELETE(request) {
  try {
    // If you're sending the ID in the body, parse it:
    const { book_id } = await request.json();

    // Connect to DB
    const connection = await pool.getConnection();

    // Check if the book exists
    const [existingBook] = await connection.query(
      'SELECT * FROM starred_books WHERE book_id = ?',
      [book_id]
    );

    if (existingBook.length === 0) {
      connection.release();
      return new Response(JSON.stringify({ message: 'Book not exists' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete it
    await connection.query(
      'DELETE FROM starred_books WHERE book_id = ?',
      [book_id]
    );
    connection.release();

    // Return success
    return new Response(JSON.stringify({ message: 'Book deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete book' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
