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
    <div className="flex items-center rounded-lg shadow-lg p-4 box-border h-full">
      <div className="w-5/6">
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
        <Link href={`/blog/${post.id}/${post.title.replaceAll(" ", "-")}`}>
          <div className="text-black text-xl mb-4 font-bold">{post.title}</div>
          <div className="text-gray-600 text-base mb-6">{post.body}</div>
        </Link>
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
      <Link
        href={`/blog/${post.id}/${post.title}`}
        className="w-2/6 bg-gray-200 ml-4 aspect-square rounded text-gray-400"
      >
        *photo*
      </Link>
    </div>
  );
};

export default PostCard;
