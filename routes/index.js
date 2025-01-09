const router = require("express").Router();

const controlers = require("../controlers/week1");

router.get("/", controlers.helloRoute);

module.exports = router;
