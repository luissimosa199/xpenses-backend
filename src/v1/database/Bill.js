const mongoose = require("mongoose");
const Bill = require("../models/billModel");

const mongoose = require("mongoose");
const Bill = require("../models/billModel");

// GET ALL BILLS
const getAllBills = async (filterParams) => {
  try {
    const bills = await Bill.find({}).sort({ createAt: -1 });
    return bills;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

// GET ONE BILL
const getOneBill = async (billId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      throw { status: 404, message: "ID not valid" };
    }

    const bill = await Bill.findById(billId);

    if (!bill) {
      throw { status: 404, message: "Bill not found" };
    }

    return bill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// CREATE ONE BILL
const createNewBill = async (newBill) => {
  try {
    const bill = await Bill.create(newBill);
    return bill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// UPDATE ONE BILL
const updateOneBill = async (billId, changes) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      throw { status: 404, message: "ID not valid" };
    }

    const bill = await Bill.findOneAndUpdate({ _id: billId }, changes);

    if (!bill) {
      throw { status: 404, message: "Bill not found" };
    }

    return bill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// DELETE ONE BILL
const deleteOneBill = async (billId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      throw { status: 404, message: "ID not valid" };
    }

    const bill = await Bill.findOneAndDelete({ _id: billId });

    if (!bill) {
      throw { status: 404, message: "Bill not found" };
    }

    return bill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  getAllBills,
  getOneBill,
  createNewBill,
  updateOneBill,
  deleteOneBill,
};
