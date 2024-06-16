"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import thumbsUp from "@/public/like.png";
import thumbsDown from "@/public/thumbs-down.png";
import anonymousPerson from "@/public/person.png";

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

type Props = {
  post: PostProps;
};

const PostCard = ({ post }: Props) => {
  //   console.log(post);
  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] rounded-lg shadow-lg p-4 box-border h-full">
        <div className="flex items-center gap-2">
          {/* <div className="bg-blue-200 rounded-lg"> */}

          <div className="text-sm text-black font-bold mb-4 text-center flex items-center">
            <Image
              className="bg-gray-200 rounded-xl mr-3"
              src={anonymousPerson}
              width={30}
              height={30}
              alt="anonymous author"
            ></Image>
            {/* </div> */}
            *Author name*
          </div>
        </div>
        <div>
          <div className="text-black text-3xl mb-4 font-bold">{post.title}</div>
          <div className="text-gray-600 text-lg mb-6">{post.body}</div>
        </div>
        <div className="bg-gray-200  rounded text-gray-400 w-full aspect-square max-h-[300px] mb-4">
          *photo*
        </div>
        <div className="flex flex-wrap gap-3 mb-3">
          {post.tags.map((tag, index) => {
            return (
              <Link key={index} href={`/tag/${tag}`}>
                <span className="bg-gray-300 rounded-2xl text-sm text-black px-3 py-1">
                  {tag}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Image
              src={thumbsUp}
              width={15}
              height={15}
              alt="thumbs up"
            ></Image>
            {post.reactions.likes}
            <Image
              src={thumbsDown}
              width={15}
              height={15}
              alt="thumbs down"
            ></Image>
            {post.reactions.dislikes}
          </div>
          <div className="flex items-center gap-2">{post.views} views</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
