"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import axios from "axios";

// {
//     "id": 1,
//     "username": "emilys",
//     "email": "emily.johnson@x.dummyjson.com",
//     "firstName": "Emily",
//     "lastName": "Johnson",
//     "gender": "female",
//     "image": "https://dummyjson.com/icon/emilys/128",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcxNzYxMTc0MCwiZXhwIjoxNzE3NjE1MzQwfQ.eQnhQSnS4o0sXZWARh2HsWrEr6XfDT4ngh0ejiykfH8",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJtaWNoYWVsdyIsImVtYWlsIjoibWljaGFlbC53aWxsaWFtc0B4LmR1bW15anNvbi5jb20iLCJmaXJzdE5hbWUiOiJNaWNoYWVsIiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL21pY2hhZWx3LzEyOCIsImlhdCI6MTcxNzYxMTc0MCwiZXhwIjoxNzIwMjAzNzQwfQ.YsStJdmdUjKOUlbXdqze0nEScCM_RJw9rnuy0RdSn88"
//   }

const basic = {
  id: 0,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  image: "",
  token: "",
  refreshToken: "",
};

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

interface UserContextType {
  user: User;
  isAuth: number;
  AuthenticateUser: (username: string, password: string) => Promise<boolean>;
  LogoutUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(basic);
  const [isAuth, setIsAuth] = useState<number>(-1);
  const isInitialMount1 = useRef(true);
  const isInitialMount2 = useRef(true);
  useEffect(() => {
    const getIsAuth = window.localStorage.getItem("isAuth");
    if (getIsAuth != null) {
      const res = JSON.parse(getIsAuth);
      //   console.log("got", res);
      setIsAuth(res);
    } else setIsAuth(0);
    const getUser = window.localStorage.getItem("user");
    if (getUser != null) {
      const response = JSON.parse(getUser);
      //   console.log(response);
      setUser(response);
    } else setUser(basic);
  }, []);

  useEffect(() => {
    if (isInitialMount1.current) {
      isInitialMount1.current = false;
    } else {
      //   console.log("change auth", isAuth);
      window.localStorage.setItem("isAuth", JSON.stringify(isAuth));
    }
  }, [isAuth]);
  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      //   console.log("change user", user);
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const AuthenticateUser = async (username: string, password: string) => {
    try {
      console.log(username, password);
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      });
      //   console.log(res.data);
      setUser(res.data);
      setIsAuth(1);

      return true;
    } catch (error) {
      console.log("error in authentication", error);
      setIsAuth(0);
      return false;
    }
  };

  const LogoutUser = () => {
    setIsAuth(0);
    setUser(basic);
  };

  const valueToShare = {
    user,
    isAuth,
    AuthenticateUser,
    LogoutUser,
  };

  return (
    <UserContext.Provider value={valueToShare}>{children}</UserContext.Provider>
  );
};

// Custom hook for using the User context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a BooksProvider");
  }
  return context;
};

export { Provider, useUser };
