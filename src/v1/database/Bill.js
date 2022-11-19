const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllBills = () => {
  return DB.bills;
};

const createNewBill = (newBill) => {
  const isAlreadyAdded =
    DB.bills.findIndex((bill) => bill.name === newBill.name && bill.date === newBill.date) > -1;

  if (isAlreadyAdded) {
    return;
  }

  DB.bills.push(newBill);
  saveToDatabase(DB);
  return {newBill: newBill, allBills: DB.bills};
};

module.exports = { getAllBills, createNewBill };
