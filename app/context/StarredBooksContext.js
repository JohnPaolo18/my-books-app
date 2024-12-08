"use client";

import React, { createContext, useState, useContext } from "react";

const StarredBooksContext = createContext();

export const StarredBooksProvider = ({ children }) => {
  const [starredBooks, setStarredBooks] = useState([]);

  return (
    <StarredBooksContext.Provider value={{ starredBooks, setStarredBooks }}>
      {children}
    </StarredBooksContext.Provider>
  );
};

export const useStarredBooks = () => {
  const context = useContext(StarredBooksContext);
  if (!context) {
    throw new Error(
      "useStarredBooks must be used within a StarredBooksProvider"
    );
  }
  return context;
};
