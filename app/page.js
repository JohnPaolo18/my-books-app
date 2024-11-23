import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="flex items-center p-4 bg-black shadow-md">
        <div className="mr-4">
          <img src="/catreader.png" alt="The Lazy Cat" width={50} height={50} />
        </div>

        {/*Header Title*/}
        <h1 className="text-2xl font-bold">The Lazy Cat Reader</h1>
      </header>
      <main className="p-4">
        <p></p>
      </main>
    </div>
  );
}
