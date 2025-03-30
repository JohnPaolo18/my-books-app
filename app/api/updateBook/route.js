import pool from '../../../lib/db';

export async function PUT(request) {
  try {
    const { book_id, title, authors, thumbnail } = await request.json();

    // Check if the book exists
    const connection = await pool.getConnection();
    const [existingBook] = await connection.query(
      'SELECT * FROM starred_books WHERE book_id = ?',
      [book_id]
    );

    if (existingBook.length === 0) {
      connection.release();
      return new Response(JSON.stringify({ message: 'Book not found' }), {
        status: 404, // Not Found
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the book details
    await connection.query(
      'UPDATE starred_books SET title = ?, authors = ?, thumbnail = ? WHERE book_id = ?',
      [title, authors, thumbnail, book_id]
    );
    connection.release();

    // Return 200 OK with the updated book details
    return new Response(
      JSON.stringify({
        message: 'Book updated successfully',
        book_id,
        title,
        authors,
        thumbnail,
      }),
      {
        status: 200, // OK
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating book:', error);
    return new Response(JSON.stringify({ message: 'Failed to update book' }), {
      status: 500, // Internal Server Error
      headers: { 'Content-Type': 'application/json' },
    });
  }
}