"use client";

import React, { createContext, useState, useEffect } from "react";

const StarredBooksContext = createContext();

export const StarredBooksProvider = ({ children }) => {
  const [starredBooks, setStarredBooks] = useState([]);

  // Fetch starred books from the MySQL database on component mount
  useEffect(() => {
    const fetchStarredBooks = async () => {
      try {
        const response = await fetch('/api/getStarredBooks');
        const data = await response.json();
        setStarredBooks(data);
      } catch (error) {
        console.error('Error fetching starred books:', error);
      }
    };

    fetchStarredBooks();
  }, []);

  return (
    <StarredBooksContext.Provider value={{ starredBooks, setStarredBooks }}>
      {children}
    </StarredBooksContext.Provider>
  );
};

export default StarredBooksContext;