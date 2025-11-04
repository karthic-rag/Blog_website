import React, { useContext } from "react";
import { Users, FileText, FolderClosed } from "lucide-react";
import { AdminContext } from "../../context/AdminContext";
import RecentTable from "../../components/admin/RecentTable";
import { BlogContext } from "../../context/BlogContext";
import { ResourceContext } from "../../context/ResourceContext";

const Dashboard = () => {
  const { count, users, resources, blogs } = useContext(AdminContext);
  const {updateBlogStatus} = useContext(BlogContext);
  const {updateResourceStatus} = useContext(ResourceContext);
  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const recentBlogs = blogs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const recentResources = resources
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blacker">Dashboard</h2>
      <p className="text-gray-700">
        Welcome to the Admin Panel. Here you can manage users, blogs, resources,
        and settings.
      </p>
      {/* counts of sources*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-6 bg-white rounded-xl shadow z-10">
          <h3 className="font-semibold text-gray-800 inline-flex justify-center items-center gap-2">
            <Users className="inline" />
            Total Users
          </h3>
          <p className="text-2xl font-bold ">{count.totalUsers}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-semibold text-gray-800 inline-flex justify-center items-center gap-2">
            <FileText />
            Active Blogs
          </h3>
          <p className="text-2xl font-bold">{count.totalBlogs}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-semibold text-gray-800 inline-flex justify-center items-center gap-2">
            <FolderClosed />
            Resources
          </h3>
          <p className="text-2xl font-bold">{count.totalResources}</p>
        </div>
      </div>

      {/* recent 3 users */}
      <RecentTable
        details={{
          heading: "Manage Users",
          tableHeadings: { head1: "Users", head2: "Username", head3: "Email" },
          page: { path: "/admin/users", name: "Manage all users" },
        }}
      >
        {recentUsers.map((user, index) => {
          return (
            <tr key={index} className="border-b-2 border-gray-300 font-light">
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td className="text-center">{user.email}</td>
            </tr>
          );
        })}
      </RecentTable>
      {/* recent 3 blogs */}
      <RecentTable
        details={{
          heading: "Manage Blogs",
          tableHeadings: {
            head1: "Blog name",
            head2: "Category",
            head3: "Action",
          },
          page: { path: "/admin/blogs", name: "Manage all blogs" },
        }}
      >
        {recentBlogs.map((blog, index) => {
          return (
            <tr key={index} className="border-b-2 border-gray-300 font-light">
              <td>{blog.title}</td>
              <td>{blog.category}</td>
              <td>
                <div className="flex flex-col gap-2 my-2 items-center">
                  <button className="bg-green-500 px-2 py-3 rounded-xl  text-white hover:bg-green-700 " onClick={() => updateBlogStatus(blog._id, "approved")}>
                    Aprove
                  </button>
                  <button className="bg-red-500 px-2 py-3 rounded-xl  text-white hover:bg-red-600 " onClick={() => updateBlogStatus(blog._id, "rejected")}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </RecentTable>
      {/* recent 3 Resources */}
      <RecentTable
        details={{
          heading: "Manage Resources",
          tableHeadings: {
            head1: "Resources name",
            head2: "Category",
            head3: "Action",
          },
          page: { path: "/admin/resources", name: "Manage all resources" },
        }}
      >
        {recentResources.map((resource, index) => {
          return (
            <tr key={index} className="border-b-2 border-gray-300 font-light">
              <td>{resource.title}</td>
              <td>{resource.category}</td>
              <td>
                <div className="flex flex-col gap-2 my-2 items-center">
                  <button className="bg-green-500 px-2 py-3 rounded-xl  text-white hover:bg-green-600 " onClick={() => updateResourceStatus(resource._id, "approved")}>
                    Aprove
                  </button>
                  <button className="bg-red-500 px-2 py-3 rounded-xl  text-white hover:bg-red-600 " onClick={() => updateResourceStatus(resource._id, "rejected")}>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </RecentTable>
    </div>
  );
};

export default Dashboard;
