import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { NavLink } from "react-router-dom";

const LatestBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const limitWords = (text = "", limit = 10) => {
    const words = text.split(" ");

    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };
  return (
    <div className="w-full min-h-[400px] mb-10">
      <p className="text-2xl font-bold mb-5">Featured blogs</p>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 ">
        {blogs.map((blog) => (
          <NavLink key={blog._id} to={`/blog/${blog._id}`}>
            <div className="bg-white rounded shadow p-4 flex flex-col items-center hover:shadow-2xl">
              <img
                src={blog.image.url}
                alt={blog.title}
                className="w-full h-50 object-cover rounded mb-3"
              />
              <p className="font-bold text-lg mb-1">
                {limitWords(blog.title, 5)}
              </p>
              <p className="text-gray-600">{limitWords(blog.subtitle, 15)}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
