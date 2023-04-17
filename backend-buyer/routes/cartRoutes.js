const express = require("express");
const {
  createcartDetail,
  getcartDetails,
  getcartDetail,
  deletecartDetail,
  updatecartDetail,
} = require("../controllers/cartController");

const router = express.Router();

//GET all workouts
router.get("/", getcartDetails);

//GET a single workouts
router.get("/:id", getcartDetail);

//POST a new workout
router.post("/add-to-cart", createcartDetail);

//DELETE a new workout
router.delete("/:id", deletecartDetail);

//UPDATE a new workout
router.patch("/:id", updatecartDetail);

module.exports = router;
