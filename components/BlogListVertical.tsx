"use client";

import Image from "next/image";
import axios from "axios";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

interface Props {
  extraurl: string;
}

interface PostProps {
  id: number;
  title: string;
  body: string;
  tags: [];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export default function BlogListVertical({ extraurl }: Props) {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/posts${extraurl}`);
        //   console.log(res.data.posts);
        setPosts(res.data.posts);
        //   console.log(posts);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  if (load === false)
    return <div className="text-center font-bold">Loading...</div>;
  if (posts.length === 0)
    return <div className="text-center font-bold">No posts were found</div>;
  return (
    <div className="flex flex-col w-[55%] min-w-[500px] h-full">
      {posts.map((post: PostProps, index: number) => {
        // if (index > 0) return;
        return (
          <div key={index} className="pb-4">
            <PostCard key={index} post={post} />
          </div>
        );
      })}
    </div>
  );
}
