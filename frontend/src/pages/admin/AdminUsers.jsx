import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminUsers = () => {
  const { users } = useContext(AdminContext);

  return (
    <div className="p-6 bg-white rounded-2xl shadow min-h-[90%]">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Username</th>
              <th className="px-6 py-3 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.username}</td>
                  <td className="px-6 py-3 capitalize">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-3 text-gray-500" colSpan="3">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
