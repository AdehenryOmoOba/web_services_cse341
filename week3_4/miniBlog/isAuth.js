function isAuthenticated(req, res, next) {
  if (req.session.user === undefined) {
    return res.status(400).json({ message: "Please login to continue" });
  }
  next();
}

module.exports = { isAuthenticated };
