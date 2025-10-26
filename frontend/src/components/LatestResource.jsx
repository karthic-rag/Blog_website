import React, { useContext } from "react";
import { ResourceContext } from "../context/ResourceContext";

const LatestBlogs = () => {
  const { resources } = useContext(ResourceContext);

  const limitWords = (text = "", limit = 10) => {
    const words = text.split(" ");

    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  };
  return (
    <div className="w-full min-h-[400px] mb-10">
      <p className="text-2xl font-bold mb-5">Highlighted Resources</p>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 ">
        {resources.map((res) => (
          <a href={res.link} target="_blank">
            <div
              key={res._id}
              className="bg-white rounded shadow p-4 flex flex-col items-center hover:shadow-2xl"
            >
              <img
                src={res.preview.url}
                alt={res.title}
                className="w-full h-50 object-cover rounded mb-3"
              />
              <p className="font-bold text-lg mb-1">
                {limitWords(res.title, 5)}
              </p>
              <p className="text-gray-600">{limitWords(res.description, 15)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
