const router = require("express").Router();
const nathanController = require("../../../week1/contacts/controllers/controllers.js");

router.get("/nathan", nathanController.nathanBirchData);

module.exports = router;
