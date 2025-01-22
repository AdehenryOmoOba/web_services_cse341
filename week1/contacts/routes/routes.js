const express = require("express");
const userController = require("../controllers");
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/nathan", userController.nathanBirchData);

router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
