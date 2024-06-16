"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import BlogListVertical from "@/components/BlogListVertical";
import { useTheme } from "../context/ThemeContext";
import { Suspense } from "react";

function MiniSearch() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("q");
  const { theme } = useTheme();
  let color = "";
  if (theme === "light") color = "white";
  else color = "gray-400";
  return (
    <div className={`bg-${color} min-h-screen`}>
      <div className="text-center text-xl font-bold">
        {" "}
        Results of your search
      </div>
      <div className="flex justify-center mt-10 ">
        <BlogListVertical extraurl={"/search?q=" + filter} />
        {/* <div>Extra</div> */}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense>
      <MiniSearch />
    </Suspense>
  );
}
