"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import MainPagePostCard from "@/components/MainPagePostCard";

type Props = {};

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

const UserBlogPage = (props: Props) => {
  const { id, postName } = useParams();
  const [load, setLoad] = useState(false);
  const [post, setPost] = useState<PostProps>({
    id: 0,
    title: "",
    body: "",
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    userId: 0,
  });

  // const [comments, setComments] = useState<CommentProps> ({

  // })

  useEffect(() => {
    setLoad(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/posts/${id}`);
        //   console.log(res.data.posts);
        setPost(res.data);
        //   console.log(posts);
      } catch (error) {
        console.log("error fetching data of posts", error);
      }
    };
    fetchData();
  }, []);
  if (load === false)
    return <div className="text-center font-bold">Loading...</div>;
  return <MainPagePostCard post={post} />;
};

export default UserBlogPage;
