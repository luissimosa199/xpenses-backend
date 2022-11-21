const billService = require("../services/billService");

// GET ALL BILLS
const getAllBills = (req, res) => {
  try {
    const allBills = billService.getAllBills();
    res.send({ status: "OK", data: allBills });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// GET ONE BILL
const getOneBill = (req, res) => {
  const {
    params: { billId },
  } = req;

  if (!billId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "ID Parameter not found" },
    });
  }

  try {
    const bill = billService.getOneBill(billId);
    res.send({ status: "OK", data: bill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// CREATE ONE BILL
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
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'description', 'date', 'amount', 'status'",
      },
    });
    return;
  }

  //   new bill structure
  const newBill = {
    name: body.name,
    description: body.description,
    date: body.date,
    amount: body.amount,
    status: body.status,
  };

  try {
    const createdBill = billService.createNewBill(newBill);
    res.status(201).send({ status: "OK", data: createdBill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// UPDATE ONE BILL
const updateOneBill = (req, res) => {
  const {
    body,
    params: { billId },
  } = req;

  if (!billId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "ID Parameter not found" },
    });
  }

  try {
    const updatedBill = billService.updateOneBill(billId, body);
    res.send({ status: "OK", data: updatedBill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// DELETE ONE BILL
const deleteOneBill = (req, res) => {
  const {
    params: { billId },
  } = req;

  if (!billId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "ID Parameter not found" },
    });
  }

  try {
    billService.deleteOneBill(billId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllBills,
  getOneBill,
  createNewBill,
  updateOneBill,
  deleteOneBill,
};
