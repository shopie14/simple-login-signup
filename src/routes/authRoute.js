const express = require("express");
const authentication = require("../controllers/auths");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Welcome to the App");
});

router.post("/login", authentication.login);

router.post("/signup", authentication.signUp);

module.exports = router;
