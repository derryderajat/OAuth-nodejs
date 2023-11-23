const { userModel } = require("../models");
const { InternalServerError } = require("../utils/errors");

const findAll = async () => {
  try {
    const users = await userModel.findMany({});
  } catch (error) {
    throw new InternalServerError("Can't get users data");
  }
};

const createFromOauth = async (email, googleId, name) => {
  try {
    let user = await userModel.upsert({
      where: { email: email },
      update: { googleId: googleId },
      create: {
        name: name,
        email: email,
        googleId: googleId,
      },
    });
    return user;
  } catch (error) {
    throw new InternalServerError("Can't create user with oauth");
  }
};

module.exports = {
  findAll,
  createFromOauth,
};
