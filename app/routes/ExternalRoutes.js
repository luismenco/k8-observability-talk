const express = require("express");
const {
  getAllBlogs
} = require("../controllers/ExternalController");

const router = express.Router();

router.route("/").get(getAllBlogs);

module.exports = router;
