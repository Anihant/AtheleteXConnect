const express = require("express");
const asyncHandler = require("express-async-handler");
const { register, success } = require("../controllers/paymentController");
const { getStats } = require("../controllers/statsController");
const { Category } = require("../controllers/categoryController");

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/success", asyncHandler(success));
router.get("/stats", asyncHandler(getStats));
router.get('/teams/:category', asyncHandler(Category));

module.exports = router;
