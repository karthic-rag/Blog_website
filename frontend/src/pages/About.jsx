import React from "react";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8 md:p-12 shadow-lg overflow-hidden">
        <div className="md:flex md:items-center md:gap-8">
          <div className="md:flex-1">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              We tell stories that matter.
            </h1>
            <p className="mt-3 text-blue-100 max-w-prose">
              At Our Blog, we create thoughtful, high-quality content for
              curious minds. From tutorials to long-form essays, we help writers
              and readers connect, learn, and grow.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium shadow hover:shadow-md transition"
                href="/contact"
              >
                Contact Us
              </a>
              <a
                className="inline-flex items-center gap-2 border border-white/25 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
                href="/blogs"
              >
                Read Our Posts
              </a>
            </div>
          </div>

          <div className="mt-6 md:mt-0 md:w-1/3">
            <div className="bg-white/10 p-4 rounded-lg">
              <h4 className="text-sm text-blue-100">Founded</h4>
              <p className="text-lg font-semibold mt-1">2019</p>

              <h4 className="text-sm text-blue-100 mt-4">Mission</h4>
              <p className="text-sm mt-1 text-blue-50">
                Build a friendly place for creators to publish and for readers
                to discover meaningful content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Features */}
      <section className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold text-lg">Quality-first</h3>
          <p className="mt-2 text-sm text-gray-600">
            We prioritize well-researched, well-written pieces that stand the
            test of time.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold text-lg">Community-driven</h3>
          <p className="mt-2 text-sm text-gray-600">
            Authors and readers shape the platform — feedback and collaboration
            matter.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold text-lg">Open & Inclusive</h3>
          <p className="mt-2 text-sm text-gray-600">
            We welcome diverse perspectives and create space for many voices.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-10 bg-white rounded-xl p-6 shadow grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-4 text-center">
          <div className="text-3xl font-bold text-gray-800">12k+</div>
          <div className="text-sm text-gray-500 mt-1">Monthly Readers</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl font-bold text-gray-800">800+</div>
          <div className="text-sm text-gray-500 mt-1">Published Articles</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-3xl font-bold text-gray-800">1k+</div>
          <div className="text-sm text-gray-500 mt-1">Active Authors</div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow">
        <div>
          <h3 className="text-lg font-semibold">Want to contribute?</h3>
          <p className="text-sm text-gray-600 mt-1">
            We're always looking for thoughtful writers and collaborators.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <a
            href="/register"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition"
          >
            Join as an Author
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
