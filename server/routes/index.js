var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About" });
});

router.get("/projects", function (req, res, next) {
  res.render("projects", { title: "Projects" });
});

router.get("/services", function (req, res, next) {
  res.render("services", { title: "Services" });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" });
});

router.get("/businesscontacts", function (req, res, next) {
  res.render("businesscontacts", { title: "Business Contacts" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/edit", function (req, res, next) {
  res.render("edit", { title: "Login" });
});

module.exports = router;
