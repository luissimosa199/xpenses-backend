const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  getAllBills,
  getOneBill,
  createNewBill,
  updateOneBill,
  deleteOneBill,
} = require("../controllers/billController");

router.use(requireAuth)

router.get("/", getAllBills);

router.get("/:billId", getOneBill);

router.post("/", createNewBill);

router.patch("/:billId", updateOneBill);

router.delete("/:billId", deleteOneBill);

module.exports = router;