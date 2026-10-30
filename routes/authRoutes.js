
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middlewares");
const { register, login, me } = require("../controllers/authcontroller");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

router.get("/test", auth, (req, res) => {
  res.send({ message: "Authentication working" });
});

module.exports = router;
