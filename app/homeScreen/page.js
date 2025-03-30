"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [starredBooks, setStarredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const router = useRouter();

  // Fetch starred books on component mount
  useEffect(() => {
    fetch('/api/getStarredBooks')
      .then((response) => response.json())
      .then((data) => {
        // Ensure `data` is an array
        if (Array.isArray(data)) {
          setStarredBooks(data);
        } else {
          console.error('Invalid data format: expected an array');
          setStarredBooks([]); // Fallback to an empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching starred books:', error);
        setStarredBooks([]); // Fallback to an empty array
      });
  }, []);

  // Fetch books from the Google Books API
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Toggle star (add/remove from starred list)
  const toggleStar = async (book) => {
    const isStarred = starredBooks.some((b) => b.book_id === book.id);

    if (isStarred) {
      // Unstar the book
      await fetch('/api/unstarBook', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: book.id }),
      });
      setStarredBooks(starredBooks.filter((b) => b.book_id !== book.id));
    } else {
      // Star the book
      await fetch('/api/starBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book_id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors?.join(", "),
          thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        }),
      });
      setStarredBooks([...starredBooks, { book_id: book.id, title: book.volumeInfo.title }]);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center p-4 bg-black shadow-md">
        <div className="mr-4">
          <Image src="/catreader.png" alt="The Lazy Cat Reader" width={50} height={50} />
        </div>
        <h1 className="text-2xl font-bold text-white">The Lazy Cat Reader</h1>
      </header>

      {/* Search Form */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Library ᓚᘏᗢ- 🐾</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBooks();
          }}
        >
          <p>Enter Book Title or Author</p>
          <input
            type="text"
            placeholder="Book Title or Author"
            style={{ padding: "8px", width: "300px", color: "black" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="mt-4 p-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-lg shadow"
            >
              Search
            </button>
          </div>
        </form>

        {/* Navigate to "My Reading List" */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => router.push("/ToBeRead")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            My Reading List
          </button>
        </div>

        {/* Render Book List or Selected Book */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {selectedBook ? (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                margin: "20px auto",
                backgroundColor: "black",
                borderRadius: "5px",
                maxWidth: "600px",
                textAlign: "left",
              }}
            >
              <h2 style={{ fontSize: "24px", marginBottom: "10px", color: "white" }}>
                {selectedBook.volumeInfo.title || "No Title Available"}
              </h2>
              <p style={{ marginBottom: "10px", color: "white" }}>
                <strong>Author(s):</strong> {selectedBook.volumeInfo.authors?.join(", ") || "Unknown"}
              </p>
              <p style={{ marginBottom: "10px", color: "white" }}>
                <strong>Summary:</strong> {selectedBook.volumeInfo.description || "No description available."}
              </p>
              <p style={{ marginBottom: "10px", color: "white" }}>
                <strong>Rating:</strong> {selectedBook.volumeInfo.averageRating || "No ratings available."}
              </p>
              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Back to List
              </button>
            </div>
          ) : (
            books.map((book) => {
              const title = book.volumeInfo.title || "No Title Available";
              const authors = book.volumeInfo.authors?.join(", ") || "Unknown";
              const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png";

              return (
                <div
                  key={book.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedBook(book)}
                >
                  <img
                    src={thumbnail}
                    alt={`Cover of ${title}`}
                    style={{
                      width: "80px",
                      height: "120px",
                      objectFit: "cover",
                      marginRight: "15px",
                      borderRadius: "5px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: "0 0 5px 0",
                        fontSize: "18px",
                        color: "#333",
                      }}
                    >
                      {title}
                    </h3>
                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                      <strong>Author(s):</strong> {authors}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(book);
                    }}
                    style={{
                      backgroundColor: starredBooks.some((b) => b.book_id === book.id) ? "#ffcc00" : "transparent",
                      color: starredBooks.some((b) => b.book_id === book.id) ? "#fff" : "#000",
                      border: "1px solid #ffcc00",
                      borderRadius: "50%",
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {starredBooks.some((b) => b.book_id === book.id) ? "⭐" : "☆"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}