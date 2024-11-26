"use client";

import React from "react";

export default function HomeScreen() {
  return (
    <div>
      <header className="flex items-center p-4 bg-black shadow-md">
        <div className="mr-4">
          <img
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
        <form>
          <p>Enter Book Title or Author</p>
          <input
            type="text"
            placeholder="Book Title or Author"
            style={{ padding: "8px", width: "300px" }}
          />
        </form>
      </div>
    </div>
  );
}
