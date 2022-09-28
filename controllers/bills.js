const bills = require("../data");

const getBills = (req, res) => {
  res.status(200).json({ success: true, data: bills });
};

const createBill = (req, res) => {
  const { newBill } = req.body;

  if (!newBill) {
    return res
      .status(400)
      .json({ success: false, msg: "Server did not receive any data" });
  }

  // add newBill to database ...

  res.status(201).json({ success: true, data: [...bills, newBill] });
};

const updateBill = (req, res) => {
  const { id } = req.params;
  const { newData } = req.body;

  const bill = bills.find((e) => e.id === Number(id));

  if (!bill) {
    return res
      .status(404)
      .json({ success: false, msg: `No bill with id of ${id}` });
  }

  // update bill in database

  const updatedBill = bills.map((bill) => {
    if (bill.id === Number(id)) {
      bill = newData;
    }
    return bill;
  });

  //

  res.status(200).json({ success: true, data: updatedBill });
};

const deleteBill = (req, res) => {
  const { id } = req.params;
  const bill = bills.find((e) => e.id === Number(id));

  if (!bill) {
    return res
      .status(404)
      .json({ success: false, msg: `No bill with id of ${id}` });
  }

  // delete bill from database
  const newBills = bills.filter((bill) => bill.id !== Number(id));
  //

  return res.status(200).json({ success: true, data: newBills });
};

const searchBills = (req, res) => {
  const { term } = req.params;

  const searchResult = bills.filter((bill) => {
    return bill.name.toLowerCase().startsWith(term);
  });

  if (searchResult.length === 0) {
    return res
      .status(401)
      .json({ success: false, msg: `No bill founded by the term "${term}"` });
  }

  return res.status(200).json({ success: true, data: searchResult });
};

module.exports = {
    getBills,
    createBill,
    updateBill,
    deleteBill,
    searchBills
}