const Bill = require("../database/Bill");
const { v4: uuid } = require("uuid");

// GET ALL BILLS
const getAllBills = () => {
  try {
    const allBills = Bill.getAllBills();
    return allBills;
  } catch (error) {
    throw error;
  }
};

// GET ONE BILL
const getOneBill = (billId) => {
  try {
    const bill = Bill.getOneBill(billId);
    return bill;
  } catch (error) {
    throw error;
  }
};

// CREATE ONE BILL
const createNewBill = (newBill) => {
  const billToInsert = {
    ...newBill,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdBill = Bill.createNewBill(billToInsert);
    return createdBill;
  } catch (error) {
    throw error;
  }
};

// UPDATE ONE BILL
const updateOneBill = (billId, changes) => {
  try {
    const updatedBill = Bill.updateOneBill(billId, changes);
    return updatedBill;
  } catch (error) {
    throw error;
  }
};

// DELETE ONE BILL
const deleteOneBill = (billId) => {
  try {
    Bill.deleteOneBill(billId);
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
