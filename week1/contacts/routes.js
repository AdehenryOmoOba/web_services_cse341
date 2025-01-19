const express = require("express");
const userData = require("./controllers");
const router = express.Router();

router.get("/nathan", userData.nathanBirchData);

router.get("/", userData.getAll);

router.get("/:id", userData.getSingle);

module.exports = router;
