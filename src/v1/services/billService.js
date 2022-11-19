const Bill = require("../database/Bill")
const { v4: uuid } = require("uuid");

const getAllBills = () => {
    const allBills = Bill.getAllBills();
    return allBills;
  };
  
  const getOneBill = () => {
    return;
  };
  
  const createNewBill = (newBill) => {
    const billToInsert = {
        ...newBill,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      };

      const createdBill = Bill.createNewBill(billToInsert);
      return createdBill;
  };
  
  const updateOneBill = () => {
    return;
  };
  
  const deleteOneBill = () => {
    return;
  };
  
  module.exports = {
    getAllBills,
    getOneBill,
    createNewBill,
    updateOneBill,
    deleteOneBill,
  };