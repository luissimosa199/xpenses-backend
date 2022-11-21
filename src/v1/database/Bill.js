const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

// GET ALL BILLS
const getAllBills = () => {
  try {
    return DB.bills;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

// GET ONE BILL
const getOneBill = (billId) => {
  try {
    const bill = DB.bills.find((bill) => bill.id === billId);
    if (!bill) {
      throw {
        status: 400,
        message: "ID Parameter not found",
      };
    }
    return bill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// CREATE ONE BILL
const createNewBill = (newBill) => {
  try {
    const isAlreadyAdded =
      DB.bills.findIndex(
        (bill) => bill.name === newBill.name && bill.date === newBill.date
      ) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Bill with the same name and date already exists`,
      };
    }
    DB.bills.push(newBill);
    saveToDatabase(DB);
    return newBill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// UPDATE ONE BILL
const updateOneBill = (billId, changes) => {
  try {
    const indexForUpdate = DB.bills.findIndex((bill) => bill.id === billId);

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Cannot find bill with id of "${billId}"`,
      };
    }

    const updatedBill = {
      ...DB.bills[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.bills[indexForUpdate] = updatedBill;
    saveToDatabase(DB);
    return updatedBill;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

// DELETE ONE BILL
const deleteOneBill = (billId) => {
  try {
    const indexForDeletion = DB.bills.findIndex((bill) => bill.id === billId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Cannot find bill with id of "${billId}"`,
      };
    }

    DB.bills.splice(indexForDeletion, 1);
    saveToDatabase(DB);
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
