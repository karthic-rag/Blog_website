const setCookie = (res, name, value, options = {}) => {
  const defaultOptions = {
    httpOnly: true, // safer against XSS
    secure: process.env.NODE_ENV === "production", // only HTTPS in production
    sameSite: "none", // CSRF protection
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 3, // default: 3 days
  };
  res.cookie(name, value, { ...defaultOptions, ...options });
};

export default setCookie;
