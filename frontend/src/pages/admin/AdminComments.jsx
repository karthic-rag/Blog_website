import React, { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";

const AdminComments = () => {
  const { comments, deleteComment } = useContext(AdminContext);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleViewComment = (comment) => {
    setSelectedComment(comment);
  };

  const closeModal = () => {
    setSelectedComment(null);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow min-h-[90%]">
      <h1 className="text-2xl font-bold mb-6">Manage Comments</h1>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">Blog Title</th>
              <th className="px-6 py-3 font-semibold">Author</th>
              <th className="px-6 py-3 font-semibold">Comment</th>
              <th className="px-6 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{comment.blog_id.title}</td>
                  <td className="px-6 py-3">{comment.author.username}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleViewComment(comment)}
                      className="text-blue-600 hover:underline"
                    >
                      View Comment
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-red-600 hover:underline" onClick={() => deleteComment(comment._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-3 text-gray-500" colSpan="4">
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Comment Modal */}
      {selectedComment && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black opacity-60"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-lg mx-auto shadow-xl">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Comment Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm sm:text-base break-words">
                    {selectedComment.content}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComments;
