const express = require("express");
const authentication = require("../controllers/auths");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("Welcome to the App");
});

router.post("/login", authentication.login);

router.post("/signup", authentication.signUp);

router.put("/update-user", authentication.updateUser);

router.get("/search-user", authentication.searchUser);

router.delete("/delete-user/:id", authentication.deleteUser);

module.exports = router;
