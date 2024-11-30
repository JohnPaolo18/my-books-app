"use client";

import React, { useState } from "react";
import Image from "next/image";
export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]); //this will store the books fetched from the API

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();
      setBooks(data.items || []); //if there are no items, set it to an empty array to avoid errors
      console.log(data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  return (
    <div>
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

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Library ᓚᘏᗢ- 🐾</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault(); //this will prevent the page from refreshing
            fetchBooks(); //Call the fetchBooks function
          }}
        >
          <p>Enter Book Title or Author</p>
          <input
            type="text"
            placeholder="Book Title or Author"
            style={{ padding: "8px", width: "300px", color: "black" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)} //this will update the query state
          />
          <div>
            <button
              type="submit"
              className="mt-4 p-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-lg shadow"
            >
              search
            </button>
          </div>
        </form>
        {/* Display Books */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {books.map((book, index) => {
            const title = book.volumeInfo.title || "No Title Available";
            const authors = book.volumeInfo?.authors?.join(", ") || "Unknown";
            const thumbnail =
              book.volumeInfo.imageLinks?.thumbnail || "/placeholder.png";
            return (
              <div
                key={index}
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

                {/* Book info */}
                <div>
                  <h3
                    style={{
                      margin: "0 0 5px 0",
                      fontSize: "18px",
                      color: "#333",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "14 px", color: "#666" }}>
                    <strong>Author(s):</strong>
                    {authors}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
