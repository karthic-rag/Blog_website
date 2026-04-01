import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(identifier, password);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-[95vh] flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="max-h-[500px] min-w-[400px] bg-white drop-shadow-lg flex flex-col rounded-xl p-5"
      >
        <p className="self-center font-bold text-2xl text-blacker mb-8">
          Welcom Back !
        </p>
        <label htmlFor="username" className="text-sm font-light">
          Username or Email
        </label>
        <input
          type="text"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-8"
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <label htmlFor="password" className="text-sm font-light">
          Password
        </label>
        <input
          type="password"
          className="outline-none border-2 border-gray-200 rounded-lg p-2 mb-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <NavLink>
          <p className="mb-5 font-light text-web-blue text-sm hover:underline">
            Forgot Password?
          </p>
        </NavLink>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-web-blue rounded-lg py-2 mb-8 text-white ${
            isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <div className="flex justify-center gap-2">
          <p>Don't have an account ?</p>
          <NavLink
            to={"/register"}
            className="text-sm text-web-blue hover:underline mt-0.5"
          >
            Sign up
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
