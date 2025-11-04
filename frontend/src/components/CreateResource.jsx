import React, { useContext, useState } from "react";
import { ResourceContext } from "../context/ResourceContext";

const CATEGORY_OPTIONS = ["Youtube", "Telegram", "Instagram", "Raw"];

const CreateResource = () => {
  const { addResource } = useContext(ResourceContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
  });
  const [image, setFormImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setImageError("Only JPEG and PNG images are allowed.");
        setFormImage(null);
        setImagePreview(null);
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setImageError("Image must be less than 2MB.");
        setFormImage(null);
        setImagePreview(null);
        return;
      }
      setImageError("");
      setFormImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageError("");
      setFormImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addResource(form, image);
    setLoading(false);
    setForm({
      title: "",
      description: "",
      category: "",
      link: "",
    });
    setFormImage(null);
    setImagePreview(null);
    setImageError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 my-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-blacker">Create Resource</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Description:
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Category:
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full px-2 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Resource Link:
        </label>
        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          required
          placeholder="https://youtube.com/..."
          className="w-full px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Image:</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="block w-full text-gray-700"
        />
        {imageError && (
          <div className="text-red-600 text-sm mt-2">{imageError}</div>
        )}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-48 rounded border border-blue-300"
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Create Resources"}
      </button>
    </form>
  );
};

export default CreateResource;
