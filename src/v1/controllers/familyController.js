const familyService = require("../services/familyService");

// LOGIN

const loginFamily = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Missing name or password",
      },
    });

    return;
  }

  try {
    const data = await familyService.loginFamily(body);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// SIGNUP

const signupFamily = async (req, res) => {
  const { body } = req;

  // validation

  if (!body.name || !body.password || !body.address) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Missing name, password or address",
      },
    });

    return;
  }

  if (body.password.length < 7) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Password length must be longer than 6",
      },
    });

    return;
  }

  try {
    const data = await familyService.signupFamily(body);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { loginFamily, signupFamily };
