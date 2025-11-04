import React, { useContext, useState } from "react";
import { Pencil } from "lucide-react";
import { UserContext } from "../context/UserContext";
import { AdminContext } from "../context/AdminContext";

const ITEMS_PER_PAGE = 4;

const Profile = () => {
  const { user, updateProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { blogs } = useContext(AdminContext);
  const { resources } = useContext(AdminContext);

  // Pagination state
  const [blogPage, setBlogPage] = useState(1);
  const [resourcePage, setResourcePage] = useState(1);

  // Profile update state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    profilePic: null,
    previewPic: user?.profile.url || "",
  });

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profilePic: file,
        previewPic: URL.createObjectURL(file),
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(profileData);
    setLoading(false);
  };

  // Pagination logic
  const myBlogs = blogs.filter((b) => b.author === user?._id);
  const paginatedBlogs = myBlogs.slice(
    (blogPage - 1) * ITEMS_PER_PAGE,
    blogPage * ITEMS_PER_PAGE
  );
  const totalBlogPages = Math.ceil(myBlogs.length / ITEMS_PER_PAGE);

  const myResources = resources.filter((r) => r.author === user?._id);
  const paginatedResources = myResources.slice(
    (resourcePage - 1) * ITEMS_PER_PAGE,
    resourcePage * ITEMS_PER_PAGE
  );
  const totalResourcePages = Math.ceil(myResources.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      {/* Left: Profile Update */}
      <div className="w-full lg:w-1/3 bg-white rounded shadow p-6 flex flex-col items-center">
        <form
          onSubmit={handleProfileSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="mb-4 text-center relative">
            <label
              htmlFor="profilePic"
              className="cursor-pointer inline-block text-center relative"
            >
              <img
                src={profileData.previewPic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
              />
              {/* Edit Icon Overlay */}
              <span className="absolute -bottom-2 -right-1 bg-web-blue rounded-full p-2 shadow">
                <Pencil color="white" />
              </span>
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePicChange}
            />
            <div>
              <h1>{profileData.name}</h1>
              <p>{profileData.username}</p>
            </div>
          </div>
          <div className="mb-3 w-full">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-3 w-full">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleProfileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Update Profile"}
          </button>
        </form>
      </div>
      {/* Right: Blogs & Resources */}
      <div className="flex-1 space-y-8">
        {/* My Blogs */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">My Blogs</h2>
          <ul>
            {paginatedBlogs.map((blog) => (
              <li key={blog._id} className="mb-4 border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{blog.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status || "draft"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* Blog Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalBlogPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setBlogPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  blogPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        {/* My Resources */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">My Resources</h2>
          <ul>
            {paginatedResources.map((res) => (
              <li key={res._id} className="mb-4 border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{res.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(res.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      res.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {res.status || "draft"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* Resource Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalResourcePages }, (_, i) => (
              <button
                key={i}
                onClick={() => setResourcePage(i + 1)}
                className={`px-3 py-1 rounded ${
                  resourcePage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
