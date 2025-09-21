import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import HomeBanner from "../assets/Home_banner.png";

const Home = () => {
  return (
    <div className="flex items-center justify-center max-w-full min-h-[300px] md:min-h-[450px] my-5 relative">
      <img
        src={HomeBanner}
        alt="Home Banner"
        className="absolute w-full h-full z-20"
      />
      <div className="absolute z-21 flex flex-col items-center gap-5 text-center">
        <p className="font-black text-2xl md:text-5xl text-white">
          Unlock Your Potential with <br /> Free Resources
        </p>
        <p className="font-extralight text-sm md:text-lg text-white sm:block hidden">
          Explore a curated collection of blogs and resources designed to help
          you <br /> learn, grow, and achieve your goals. Join our community and
          start your <br />
          journey today.
        </p>
        <p className="font-extralight text-sm md:text-xl text-white sm:hidden">
          Join our community and start your journey today.
        </p>
        <button className="px-4 py-2 bg-web-blue text-white font-medium rounded-xl hover:bg-blue-800">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
