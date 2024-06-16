import Image from "next/image";
import searchIcon from "@/public/search-interface-symbol.png";
import { useState } from "react";

export default function SearchItem() {
  return (
    <>
      <div className="bg-gray-100 h-full rounded-3xl flex items-center">
        <Image
          src={searchIcon}
          alt="search-icon"
          width={20}
          height={20}
          className="mx-3"
        ></Image>
        <form action="/searchResults/">
          <input
            className="bg-gray-100 focus:outline-none placeholder:text-sm text-sm w-full mr-3 focus:bg-gray-100"
            placeholder="Search..."
            name="q"
          ></input>
        </form>
      </div>
    </>
  );
}
