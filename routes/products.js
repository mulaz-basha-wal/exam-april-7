var express = require("express");
var router = express.Router();
const productsModel = require("../models").Product;
const categoryModel = require("../models").Category;

router.get("/", function (req, res, next) {
  productsModel.findAll({ include: categoryModel }).then(
    function (products) {
      res.status(200).json(products);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.post("/", (req, res) => {
  productsModel.create(req.body).then(
    (product) => {
      res.status(200).json({ status: 1, product });
    },
    (error) => {
      res.status(500).json(error);
    }
  );
});

router.put("/:productId", (req, res) => {
  productsModel
    .update(req.body, {
      where: {
        id: parseInt(req.params.productId),
      },
    })
    .then((status) => {
      if (status.includes(1)) {
        res.status(200).json({ status: 1, debug_date: "updated successfully" });
      } else {
        res.status(404).json({ status: 0, debug_date: "record not found" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:productId", async (req, res) => {
  const row = await productsModel.findOne({
    where: { id: parseInt(req.params.productId) },
  });
  if (row) {
    await row.destroy();
    res.status(200).json({ status: 1, debug_date: "deleted successfully" });
  } else {
    res.status(404).json({ status: 0, debug_date: "record not found" });
  }
});

module.exports = router;
