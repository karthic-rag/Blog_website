import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark-gray p-2 text-light-gray anchor">
      <div className="grid md:grid-cols-4 grid-cols-2 my-3 gap-6 px-3">
        <div className="pr-4">
          <h2>ResourceHub</h2>
          <p>Democratizing knowledge for all.</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2>Quick Links</h2>
          <NavLink>
            <p>Home</p>
          </NavLink>
          <NavLink>
            <p>Resources</p>
          </NavLink>
          <NavLink>
            <p>Blog</p>
          </NavLink>
          <NavLink>
            <p>Contact</p>
          </NavLink>
        </div>
        <div className="flex flex-col gap-2">
          <h2>Community</h2>
          <a href="" target="_blank">
            GitHub
          </a>
          <a href="" target="_blank">
            Discord
          </a>
          <a href="" target="_blank">
            Twitter
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h2>Legal</h2>
          <a href="" target="_blank">
            Privacy Policy
          </a>
          <a href="" target="_blank">
            Terms of Service
          </a>
        </div>
      </div>
      <hr />
      <div className="text-center p-4">
        @ 2025 ResourceHub. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
