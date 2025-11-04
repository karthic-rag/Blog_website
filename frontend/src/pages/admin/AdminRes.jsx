import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { ResourceContext } from "../../context/ResourceContext";

const AdminRes = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const { resources } = useContext(AdminContext);
  const {updateResourceStatus}=useContext(ResourceContext);
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
              filteredres.map((res) => (
                <tr key={res.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{res.title}</td>
                  <td className="px-6 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        res.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : res.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {res.status === "pending" && (
                      <>
                        <button className="text-green-600 hover:underline mr-3" onClick={() => updateResourceStatus(res._id, "approved")}>
                          Approve
                        </button>
                        <button className="text-red-600 hover:underline" onClick={() => updateResourceStatus(res._id, "rejected")}>
                          Reject
                        </button>
                      </>
                    )}
                    {res.status === "approved" && (
                  
                        <button className="text-red-600 hover:underline" onClick={() => updateResourceStatus(res._id, "rejected")}>
                          Reject
                        </button>
                        
                    )}
                    {res.status === "rjected" && (
                      
                        <button className="text-green-600 hover:underline mr-3" onClick={() => updateResourceStatus(res._id, "approved")}>
                          Approve
                        </button>
                       
                      
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr >
                <td className="px-6 py-3 text-gray-500" colSpan="3">
                  No {activeTab} resources found.
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
