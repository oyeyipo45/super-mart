import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
    },
    config.SECRET,
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

export default getToken;
