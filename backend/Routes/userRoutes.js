const express = require("express");
const router = express.Router();

const { login, register,checkcookie, removecookie} = require("../Controllers/userController.js");

router.post("/register", register);

router.post("/login", login);

router.get("/checkcookie", checkcookie);

router.delete("/removecookie", removecookie);

module.exports = router;
