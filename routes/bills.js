const express = require("express");
const router = express.Router();
const {
  getBills,
  createBill,
  updateBill,
  deleteBill,
  searchBills,
} = require("../controllers/bills");

// path
const path = "/";

// GET
router.get(path, getBills);

// POST
router.post(path, createBill);

// UPDATE
router.put(`${path}:id`, updateBill);

// DELETE
router.delete(`${path}:id`, deleteBill);

// SEARCH
router.get(`${path}search/:term`, searchBills);

module.exports = router;
