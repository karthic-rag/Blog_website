import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { NavLink } from "react-router-dom";

const Blogs = () => {
  const { AppBlogs } = useContext(BlogContext);

  const limitWords = (text = "", limit = 10) => {
    const words = text.split(" ");

    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };

  return (
    <div className="w-full min-h-[400px] mb-10">
      <p className="text-2xl text-center font-bold my-6">Our Blogs</p>
      <p className="text-sm text-center font-normal text-gray-500 my-6">
        Stay updated with the latest trends, tips, and insights in the world of{" "}
        <br /> technology, education, and artificial intelligence
      </p>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
        {AppBlogs?.map((blog, index) => {
          const formattedDate = new Date(blog.updatedAt).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          );

          return (
            <NavLink key={index} to={`/blog/${blog._id}`}>
              <div className="bg-white rounded shadow p-4 flex flex-col  hover:shadow-2xl transition-all">
                <img
                  src={blog?.image?.url}
                  alt={blog?.title || "Blog Image"}
                  className="w-full h-52 object-cover rounded mb-3"
                />

                <div className="w-full text-sm text-gray-500 mb-2 text-center flex gap-5 justify-start">
                  <p className="font-medium">
                    {blog?.author?.username || "Unknown Author"}
                  </p>
                  <p>{formattedDate}</p>
                </div>

                <p className="font-bold text-lg mb-1">
                  {limitWords(blog.title, 5)}
                </p>
                <p className="text-gray-600 ">
                  {limitWords(blog.subtitle, 15)}
                </p>
                <p className="w-fit p-2 my-3 rounded-2xl bg-green-400">
                  {blog.category}
                </p>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
