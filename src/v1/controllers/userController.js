const userService = require("../services/userService");

// LOGIN

const loginUser = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Missing email or password",
      },
    });

    return;
  }

  try {
    const data = await userService.loginUser(body);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// SIGNUP

const signupUser = async (req, res) => {
  const { body } = req;

  // validation

  if (!body.email || !body.password) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Missing email or password",
      },
    });

    return;
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (!body.email.match(emailRegex)) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error: "Email not valid",
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
    const data = await userService.signupUser(body);
    res.status(201).send({ status: "OK", data: data });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { loginUser, signupUser };
