"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import BlogListVertical from "@/components/BlogListVertical";
import { useTheme } from "@/app/context/ThemeContext";

export default function TagPage() {
  const { tagName } = useParams();
  const { theme } = useTheme();
  let color = "";
  if (theme === "light") color = "white";
  else color = "gray-400";
  return (
    <div className={`bg-${color} min-h-screen`}>
      <div className="text-center text-xl font-bold">
        {" "}
        Read blogs with the tag of {tagName}
      </div>
      <div className="flex justify-center mt-10 ">
        <BlogListVertical extraurl={"/tag/" + tagName} />
        {/* <div>Extra</div> */}
      </div>
    </div>
  );
}
