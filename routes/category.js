var express = require("express");
var router = express.Router();
const categoryModel = require("../models").Category;

router.get("/", function (req, res, next) {
  categoryModel.findAll().then(
    function (users) {
      res.status(200).json(users);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.post("/", (req, res) => {
  const { name } = req.body;
  categoryModel.create({ name }).then(
    (category) => {
      res.status(200).json({ status: 1, category });
    },
    (error) => {
      res.status(500).json(error);
    }
  );
});

module.exports = router;
