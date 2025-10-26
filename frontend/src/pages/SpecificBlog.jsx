import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { UserContext } from "../context/UserContext";

const SpecificBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const { getSpecificBlog, getSpecComments, addComment } =
    useContext(BlogContext);

  const formattedDate = blog?.updatedAt
    ? new Date(blog.updatedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  useEffect(() => {
    const getBlog = async () => {
      const data = await getSpecificBlog(blogId);
      setBlog(data);
    };
    const getComments = async () => {
      const comments = await getSpecComments(blogId);
      setComments(comments);
    };
    getComments();
    getBlog();
  }, [blogId]);

  const handlePostComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    await addComment(commentText, blogId);

    // optimistic UI update
    const newComment = {
      _id: Date.now().toString(),
      content,
      author: {
        _id: user?._id,
        username: user?.username,
        profile: user?.profile,
      },
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  return (
    <div className="max-w-[800px] min-h-[80vh] my-6 m-auto p-4 shadow rounded-xl bg-white">
      {/*Blog section */}
      <div>
        <p className="text-gray-700 mb-3">Blogs/{blog.category}</p>
        <h1 className="text-2xl mb-2">{blog.title}</h1>
        <div className="flex gap-5 text-gray-400 mb-5">
          <p>By {blog.author?.username}</p>
          <p>Published on {formattedDate}</p>
        </div>
        <img
          src={blog.image?.url}
          alt="bolg img"
          className="rounded-2xl max-h-80 mb-5 w-full"
        />

        {blog.description?.split(/\n+/).map((para, i) => (
          <p
            key={i}
            className="mb-4 text-justify text-gray-700 leading-relaxed"
          >
            {para.trim()}
          </p>
        ))}
      </div>
      <hr />
      {/*Comments section */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold mb-4">Comments</h1>

        {/* New comment form */}
        <div className="flex gap-4 items-start mb-4">
          <div className="flex-shrink-0">
            <img
              src={user?.profile?.url}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  handlePostComment();
                }
              }}
              placeholder="Write a comment..."
              className="w-full p-3 border rounded-lg resize-none min-h-[96px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePostComment}
                disabled={!commentText.trim()}
                className={`px-4 py-2 rounded-lg text-white ${
                  commentText.trim()
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-500">
              No comments yet. Be the first to comment.
            </p>
          )}
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm"
            >
              <img
                src={c.author?.profile?.url}
                alt={c.author?.username || "user"}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="text-sm text-gray-700 font-medium">
                  {c.author?.username || "Anonymous"}
                  <span className="text-xs text-gray-400 ml-2">
                    {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                  </span>
                </div>
                <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificBlog;
