import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../configs/ConfigAxios";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirm, setConfirm] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/register", {
        username,
        password,
        email,
        confirm,
      });

      toast.success(res.data?.message || "User created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "User not created");
    }
  };
  return (
    <div className="min-h-[95vh] flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="max-h-[650px] min-w-[400px] bg-white drop-shadow-lg flex flex-col rounded-xl p-5"
      >
        <p className="self-center font-bold text-2xl text-blacker ">
          Create your account
        </p>
        <p className="self-center font-extralight text-sm mb-8">
          Join our community of learners and creators
        </p>
        <label htmlFor="username" className="text-sm font-light">
          Username
        </label>
        <input
          type="text"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-8"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email" className="text-sm font-light">
          Email
        </label>
        <input
          type="text"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-8"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="text-sm font-light">
          Password
        </label>
        <input
          type="text"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-8"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm password" className="text-sm font-light">
          Confirm Password
        </label>
        <input
          type="text"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-5"
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-web-blue rounded-lg py-2 mb-8 text-white hover:bg-blue-800"
        >
          Sign up
        </button>
        <div className="flex justify-center gap-2">
          <p>Already have an account ?</p>
          <NavLink
            to={"/login"}
            className="text-sm text-web-blue hover:underline mt-0.5"
          >
            Sign in
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
