const billService = require("../services/billService");

const getAllBills = (req, res) => {
  const allBills = billService.getAllBills();
  res.send({ status: "OK", data: allBills });
};

const getOneBill = (req, res) => {
  const bill = billService.getOneBill();
  res.send("Get an existing bill");
};

const createNewBill = (req, res) => {
  const { body } = req;

//   validation
  if (
    !body.name ||
    !body.description ||
    !body.date ||
    !body.amount ||
    !body.status
  ) {
    return;
  }

//   new bill structure
  const newBill = {
    name: body.name,
    description: body.description,
    date: body.date,
    amount: body.amount,
    status: body.status,
  }

  const createdBill = billService.createNewBill(newBill);
  
  res.status(201).send({ status: "OK", data: createdBill });
};

const updateOneBill = (req, res) => {
  const updateBill = billService.updateOneBill();
  res.send("Update an existing bill");
};

const deleteOneBill = (req, res) => {
  billService.deleteOneBill();
  res.send("Delete an existing bill");
};

module.exports = {
  getAllBills,
  getOneBill,
  createNewBill,
  updateOneBill,
  deleteOneBill,
};
