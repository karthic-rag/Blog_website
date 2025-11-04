import HomeBanner from "../assets/cover.jpeg";
import LatestBlogs from "../components/LatestBlogs";
import LatestResource from "../components/LatestResource";
import { useRef } from "react";

const Home = () => {
  // added ref for scrolling
  const blogsRef = useRef(null);

  // scroll handler
  const handleGetStarted = () => {
    if (blogsRef.current) {
      blogsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div className="relative flex items-center justify-center max-w-full min-h-[350px] md:min-h-[450px] my-5 mb-20">
        {/* Responsive Banner Image */}
        <img
          src={HomeBanner}
          alt="Home Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        {/* Text Content */}
        <div className="relative z-30 flex flex-col items-center gap-5 text-center px-4 w-full">
          <p className="font-black text-2xl md:text-5xl text-white drop-shadow-lg">
            Unlock Your Potential with <br /> Free Resources
          </p>
          <p className="font-extralight text-sm md:text-lg text-white sm:block hidden drop-shadow">
            Explore a curated collection of blogs and resources designed to help
            you <br /> learn, grow, and achieve your goals. Join our community
            and start your <br />
            journey today.
          </p>
          <p className="font-extralight text-sm md:text-xl text-white sm:hidden drop-shadow">
            Join our community and start your journey today.
          </p>
          <button
            type="button"
            onClick={handleGetStarted}
            className="px-4 py-2 bg-web-blue text-white font-medium rounded-xl hover:bg-blue-800 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
      {/* wrap latest sections so Get Started scroll lands at the top of blogs (resources follow) */}
      <div ref={blogsRef}>
        <LatestBlogs />
        <LatestResource />
      </div>
    </div>
  );
};

export default Home;
