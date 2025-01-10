const professionalData = require("../backend/user.json");

const helloRoute = (req, res) => {
  res.json(professionalData);
};

module.exports = {
  helloRoute,
};
