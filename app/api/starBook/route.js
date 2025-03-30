// import pool from '../../../lib/db';

// export async function POST(request) {
//   try {
//     const { book_id, title, authors, thumbnail } = await request.json();

//     // Check if the book already exists
//     const connection = await pool.getConnection();
//     const [existingBook] = await connection.query(
//       'SELECT * FROM starred_books WHERE book_id = ?',
//       [book_id]
//     );

//     if (existingBook.length > 0) {
//       connection.release();
//       return new Response(JSON.stringify({ message: 'Book already exists' }), {
//         status: 409, // Conflict
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Insert the new book
//     await connection.query(
//       'INSERT INTO starred_books (book_id, title, authors, thumbnail) VALUES (?, ?, ?, ?)',
//       [book_id, title, authors, thumbnail]
//     );
//     connection.release();

//     // Return 201 Created with the new book details
//     return new Response(
//       JSON.stringify({
//         message: 'Book created successfully',
//         book_id,
//         title,
//         authors,
//         thumbnail,
//       }),
//       {
//         status: 201, // Created
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error('Error starring book:', error);
//     return new Response(JSON.stringify({ message: 'Failed to create book' }), {
//       status: 500, // Internal Server Error
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

import pool from '../../../lib/db';

export async function POST(request) {
  try {
    const payload = await request.json();
    // Allow a single book or an array of books
    const books = Array.isArray(payload) ? payload : [payload];

    // Validate that required fields exist for each book (optional)
    // You could add additional validation here if needed.

    // Extract all book IDs to check for duplicates in one query
    const bookIds = books.map(book => book.book_id);

    const connection = await pool.getConnection();

    // Check for books that already exist
    const [existingBooks] = await connection.query(
      'SELECT book_id FROM starred_books WHERE book_id IN (?)',
      [bookIds]
    );
    const existingSet = new Set(existingBooks.map(book => book.book_id));

    // Separate new books from duplicates
    const booksToInsert = [];
    const duplicateBooks = [];

    books.forEach(book => {
      if (existingSet.has(book.book_id)) {
        duplicateBooks.push(book);
      } else {
        booksToInsert.push(book);
      }
    });

    // Insert new books using a bulk insert if any
    if (booksToInsert.length > 0) {
      const values = booksToInsert.map(book => [
        book.book_id,
        book.title,
        book.authors,
        book.thumbnail,
      ]);
      await connection.query(
        'INSERT INTO starred_books (book_id, title, authors, thumbnail) VALUES ?',
        [values]
      );
    }
    connection.release();

    return new Response(
      JSON.stringify({
        message: 'Books processed successfully',
        created: booksToInsert,
        duplicates: duplicateBooks,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing books:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to process books' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
