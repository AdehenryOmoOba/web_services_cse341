const router = require("express").Router();
const homeController = require("../controllers/homeController.js");

router.get("/", homeController.homeMessage);

module.exports = router;
