"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStarredBooks } from "../context/StarredBooksContext";

export default function HomeScreen() {
  const { starredBooks, setStarredBooks } = useStarredBooks();
  const [query, setQuery] = useState(""); // To track the search query
  const [books, setBooks] = useState([]); // To store the books fetched from the API
  const [selectedBook, setSelectedBook] = useState(null); // To track the selected book
  const router = useRouter(); // Initialize router

  // Fetch books from the Google Books API
  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
      );
      const data = await response.json();
      setBooks(data.items || []); // If there are no items, set to an empty array
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  // Toggle star (add or remove from starred list)
  const toggleStar = (book) => {
    const isStarred = starredBooks.some((b) => b.id === book.id);
    if (isStarred) {
      setStarredBooks(starredBooks.filter((b) => b.id !== book.id)); // Remove from starred
    } else {
      setStarredBooks([...starredBooks, book]); // Add to starred
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="flex items-center p-4 bg-black shadow-md">
        <div className="mr-4">
          <Image
            src="/catreader.png"
            alt="The Lazy Cat Reader"
            width={50}
            height={50}
          />
        </div>
        <h1 className="text-2xl font-bold">The Lazy Cat Reader</h1>
      </header>

      {/* Search Form */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Library ᓚᘏᗢ- 🐾</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent page refresh
            fetchBooks(); // Fetch books
          }}
        >
          <p>Enter Book Title or Author</p>
          <input
            type="text"
            placeholder="Book Title or Author"
            style={{ padding: "8px", width: "300px", color: "black" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update the query
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

        {/* Button to Navigate to "My Reading List" */}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => router.push("/ToBeRead")} // Navigate to To Be Read page
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

        {/* Conditional Rendering: Selected Book or Book List */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {selectedBook ? (
            // Display Selected Book Details
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
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {selectedBook.volumeInfo.title || "No Title Available"}
              </h2>
              <p style={{ marginBottom: "10px" }}>
                <strong>Author(s):</strong>{" "}
                {selectedBook.volumeInfo.authors?.join(", ") || "Unknown"}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Summary:</strong>{" "}
                {selectedBook.volumeInfo.description ||
                  "No description available."}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Rating:</strong>{" "}
                {selectedBook.volumeInfo.averageRating ||
                  "No ratings available."}
              </p>
              <button
                onClick={() => setSelectedBook(null)} // Back to the list
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
            // Display List of Books
            books.map((book) => {
              const title = book.volumeInfo.title || "No Title Available";
              const authors = book.volumeInfo?.authors?.join(", ") || "Unknown";
              const thumbnail =
                book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png";

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
                  onClick={() => setSelectedBook(book)} // Set selected book
                >
                  {/* Book Cover */}
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
                  {/* Book Info */}
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
                  {/* Star Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent book click
                      toggleStar(book); // Toggle star
                    }}
                    style={{
                      backgroundColor: starredBooks.some(
                        (b) => b.id === book.id
                      )
                        ? "#ffcc00"
                        : "transparent",
                      color: starredBooks.some((b) => b.id === book.id)
                        ? "#fff"
                        : "#000",
                      border: "1px solid #ffcc00",
                      borderRadius: "50%",
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {starredBooks.some((b) => b.id === book.id) ? "⭐" : "☆"}
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
