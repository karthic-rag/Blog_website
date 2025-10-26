import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const initial = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const { contactUs } = useContext(UserContext);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMessage, setServerMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    )
      e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerMessage("");
    try {
      // Replace with real API call
      await contactUs(form);
      setStatus("success");
      setServerMessage(
        "Your message has been sent. We'll get back to you soon."
      );
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setServerMessage("Failed to send message. Please try again later.");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Info panel */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p className="text-sm mb-4 opacity-90">
            Have questions, feedback or want to collaborate? Send us a message
            and we'll reply as soon as possible.
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <div className="font-semibold">Email</div>
              <div className="opacity-90">support@yourblog.com</div>
            </div>
            <div>
              <div className="font-semibold">Phone</div>
              <div className="opacity-90">+1 (555) 123-4567</div>
            </div>
            <div>
              <div className="font-semibold">Office</div>
              <div className="opacity-90">123 Blog Street, Content City</div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:w-2/3 p-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  errors.subject ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.subject && (
                <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                  errors.message ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-3">
                {status === "success" && (
                  <div className="text-sm text-green-600">{serverMessage}</div>
                )}
                {status === "error" && (
                  <div className="text-sm text-red-600">{serverMessage}</div>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`px-4 py-2 rounded text-white font-medium transition ${
                    status === "sending"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </form>

          {/* small keyboard shortcut handler */}
          <div
            tabIndex={0}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                // try to submit if valid
                if (validate()) handleSubmit(e);
              }
            }}
            className="sr-only"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
