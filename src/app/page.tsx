import Gallery from "@/Components/Gallery";
import Loading from "@/Components/Loading";
import React from "react";

export default function page() {
  return (
    <main className="h-[200vh] w-screen overflow-hidden">
      {/* <Loading /> */}
      <Gallery></Gallery>
    </main>
  );
}
