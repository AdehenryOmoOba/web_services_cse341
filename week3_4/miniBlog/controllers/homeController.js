const homeMessage = (req, res) => {
  //#swagger.tags = ['Home Page']
  res.setHeader("Content-Type", "application/json");
  res
    .status(200)
    .json({ message: "Welcome to Web Services CSE341 - 2025 Winter Block 1" });
};

module.exports = {
  homeMessage,
};
