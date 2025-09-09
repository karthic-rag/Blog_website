export const isAdmin = async (req, res) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "access denied, admin only" });
  }

  next();
};
