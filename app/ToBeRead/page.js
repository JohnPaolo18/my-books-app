"use client";

import React from "react";
import Image from "next/image"; // Import Image from Next.js
import { useStarredBooks } from "../context/StarredBooksContext";

export default function ToBeRead() {
  const { starredBooks, setStarredBooks } = useStarredBooks();

  const toggleStar = (book) => {
    setStarredBooks(starredBooks.filter((b) => b.id !== book.id));
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

      {/* To Be Read List */}
      <h1
        className="text-2xl font-bold"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        To Be Read List ᓚᘏᗢ- 🐾
      </h1>
      {starredBooks.length === 0 ? (
        <p
          className="text-2xl font-bold"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          No books in your list yet ᓚᘏᗢ- 🐾.
        </p>
      ) : (
        starredBooks.map((book) => {
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
              }}
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
                <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  <strong>Author(s):</strong> {authors}
                </p>
              </div>

              {/* Star Button */}
              <button
                onClick={() => toggleStar(book)}
                style={{
                  backgroundColor: "#ffcc00",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  cursor: "pointer",
                }}
              >
                ⭐
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
