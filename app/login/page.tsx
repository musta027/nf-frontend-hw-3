"use client";

import React, { createRef, useRef } from "react";
import { useState } from "react";
import { useUser } from "../context/AuthContext";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

type Props = {};

const LoginPage = () => {
  const [tryAgain, setTryAgain] = useState(-1);
  // -1 didnt try, 0 correct, 1 wrong, 2 already logged in
  const { user, isAuth, AuthenticateUser } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAuth === 1) {
      setTryAgain(2);
      return;
    }
    const res = await AuthenticateUser(
      e.currentTarget.username.value,
      e.currentTarget.password.value
    );
    if (res === true) {
      setTryAgain(0);
    } else setTryAgain(1);
    // console.log(!res);
  };
  const { theme } = useTheme();
  let color = "";
  if (theme === "light") color = "white";
  else color = "gray-400";
  return (
    <div className={`bg-${color} min-h-screen`}>
      <div className="flex items-start pt-20 justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              handleSubmit(e);
              e.currentTarget.username.value = "";
              e.currentTarget.password.value = "";
            }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          {tryAgain === 1 && (
            <div className="font-bold text-red-400 text-lg text-center pt-4">
              Wrong Credentials! Try again
            </div>
          )}
          {tryAgain === 0 && isAuth === 1 && (
            <div className="font-bold text-green-400 text-lg text-center pt-4">
              Success!
            </div>
          )}
          {tryAgain === 2 && isAuth === 1 && (
            <div className="font-bold text-red-400 text-lg text-center pt-4">
              You are already logged in!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
