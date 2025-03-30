"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BannerPage() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: `url("/blackcatbanner.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "760px",
        paddingTop: "275px",
      }}
    >
      <button
        onClick={() => router.push("/homeScreen")}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "black",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Let's find your favorite book
      </button>
    </div>
  );
}