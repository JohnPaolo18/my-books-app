"use client";

import React, { useState, useEffect } from "react";

export default function ToBeRead() {
  const [starredBooks, setStarredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStarredBooks = async () => {
      try {
        const response = await fetch('/api/getStarredBooks', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStarredBooks(data);
      } catch (error) {
        console.error("Error fetching starred books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Reading List</h1>
      {starredBooks.length > 0 ? (
        starredBooks.map((book) => (
          <div key={book.book_id}>
            <h2>{book.title}</h2>
            <p>{book.authors}</p>
            <img src={book.thumbnail} alt={book.title} style={{ width: "100px", height: "150px" }} />
          </div>
        ))
      ) : (
        <p>No books in your reading list yet.</p>
      )}
    </div>
  );
}