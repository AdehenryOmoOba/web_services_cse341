const router = require("express").Router();
const controlers = require("../week1/contacts/controllers");

router.get("/", controlers.helloRoute);

module.exports = router;
