const Bill = require("../database/Bill");
const { v4: uuid } = require("uuid");

// GET ALL BILLS
const getAllBills = async (filterParams) => {
  try {
    const allBills = await Bill.getAllBills(filterParams);
    return allBills;
  } catch (error) {
    throw error;
  }
};

// GET ONE BILL
const getOneBill = async (billId) => {
  try {
    const bill = await Bill.getOneBill(billId);
    return bill;
  } catch (error) {
    throw error;
  }
};

// CREATE ONE BILL
const createNewBill = async (newBill) => {
  const billToInsert = newBill;
  try {
    const createdBill = await Bill.createNewBill(billToInsert);
    return createdBill;
  } catch (error) {
    throw error;
  }
};

// UPDATE ONE BILL
const updateOneBill = async (billId, changes) => {
  try {
    const updatedBill = await Bill.updateOneBill(billId, changes);
    return updatedBill;
  } catch (error) {
    throw error;
  }
};

// DELETE ONE BILL
const deleteOneBill = async (billId) => {
  try {
    const deletedBill = await Bill.deleteOneBill(billId);
    return deletedBill
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBills,
  getOneBill,
  createNewBill,
  updateOneBill,
  deleteOneBill,
};
