const billService = require("../services/billService");

// GET ALL BILLS
const getAllBills = async (req, res) => {

  const filterParams = req.query;

  if(!filterParams.family){
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Family parameter not found, you must loggin into a family to get bills" },
    });

  }

  try {
    const allBills = await billService.getAllBills(filterParams);
    res.send({ status: "OK", quantity: allBills.length, data: allBills });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// GET ONE BILL
const getOneBill = async (req, res) => {

  const {
    params: { billId },
  } = req;

  if (!billId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "ID Parameter not found" },
    });

    return;
  }

  try {
    const bill = await billService.getOneBill(billId);
    res.send({ status: "OK", data: bill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// CREATE ONE BILL
const createNewBill = async (req, res) => {
  const { body } = req;

  //   validation
  if (
    !body.name ||
    !body.description ||
    !body.date ||
    !body.amount ||
    !body.status ||
    !body.createdBy ||
    !body.family
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'description', 'date', 'amount', 'status', 'createdBy', 'family'",
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
    createdBy: body.createdBy,
    family: body.family
  };

  try {
    const createdBill = await billService.createNewBill(newBill);
    res.status(201).send({ status: "OK", data: createdBill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// UPDATE ONE BILL
const updateOneBill = async (req, res) => {
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
    const updatedBill = await billService.updateOneBill(billId, body);
    res.send({ status: "OK", data: updatedBill });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// DELETE ONE BILL
const deleteOneBill = async (req, res) => {
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
    const deletedBill = await billService.deleteOneBill(billId);
    res.status(204).send({ status: "OK", data: deletedBill });
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
