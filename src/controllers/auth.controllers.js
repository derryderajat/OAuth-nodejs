const { createToken } = require("../utils/jwt");
const oauth2 = async (req, res) => {
  const payload = { ...req.user, password: null };
  let token = await createToken(payload);

  res.json({
    status: true,
    message: "OK",
    data: { token },
  });
};

module.exports = { oauth2 };
