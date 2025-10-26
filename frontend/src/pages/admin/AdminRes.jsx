import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminRes = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const { resources } = useContext(AdminContext);
  const filteredres = resources.filter((b) => b.status === activeTab);

  return (
    <div className="p-6 bg-white rounded-2xl shadow min-h-[90%]">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredres.length > 0 ? (
              filteredres.map((blog) => (
                <tr key={blog.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{blog.title}</td>
                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        blog.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : blog.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {blog.status === "pending" && (
                      <>
                        <button className="text-green-600 hover:underline mr-3">
                          Approve
                        </button>
                        <button className="text-red-600 hover:underline">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-3 text-gray-500" colSpan="3">
                  No {activeTab} blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRes;
