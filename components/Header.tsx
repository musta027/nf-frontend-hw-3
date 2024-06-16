"use client";

import Image from "next/image";
import Link from "next/link";
import SearchItem from "./SearchItem";
import { useUser } from "@/app/context/AuthContext";
import { useState } from "react";
import axiosInstance from "../app/axiosInstance";
import axios from "axios";
import { useTheme } from "@/app/context/ThemeContext";

export default function Header() {
  const { user, isAuth, AuthenticateUser, LogoutUser } = useUser();

  const handleClickAuthor = async () => {
    const response = await axiosInstance.get("https://dummyjson.com/auth/me");
    console.log(response.data);
    return;
  };
  const handleClickAdd = async () => {
    alert("check console");
    const response = await axiosInstance.post(
      "https://dummyjson.com/posts/add",
      {
        title: "My first story",
        userId: user.id,
      }
    );
    console.log(response.data);
    return;
  };
  const handleClickUpdate = async () => {
    alert("check console");
    const response = await axiosInstance.put("https://dummyjson.com/posts/1", {
      title: "I want to sleep please",
    });
    console.log(response.data);
    return;
  };
  const handleClickDelete = async () => {
    alert("check console");
    const response = await axiosInstance.delete(
      "https://dummyjson.com/posts/1"
    );
    console.log(response.data);
    return;
  };
  const { theme } = useTheme();
  let color = "";
  if (theme === "light") color = "white";
  else color = "gray-400";
  return (
    <div className={`bg-${color} pb-3`}>
      <div className="flex items-center justify-between h-10 pl-4  pr-10 w-full">
        <div className="flex items-center m-2 ">
          <Link href="/" className="text-3xl font-sans pl-4 font-bold h-full">
            Medium
          </Link>
          <div className="pl-6 h-full w-1/6 min-w-64">
            <SearchItem />
          </div>
        </div>
        {isAuth === 0 && (
          <Link href="/login" className="ml-4">
            Login
          </Link>
        )}
        {isAuth === 1 && (
          <div className="flex items-center gap-3">
            <div onClick={handleClickAuthor} className="font-bold text-lg">
              {user.firstName} {user.lastName}
            </div>
            <button onClick={handleClickAdd} className="font-bold text-lg">
              Add
            </button>
            <button onClick={handleClickUpdate} className="font-bold text-lg">
              Update
            </button>
            <button onClick={handleClickDelete} className="font-bold text-lg">
              Delete
            </button>
            <Link href="/login" onClick={LogoutUser}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
