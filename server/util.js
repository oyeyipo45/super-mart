import jwt from "jsonwebtoken";
import config from "./config";


const getToken = (user) => {
  
  return jwt.sign(
    {
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};

export default getToken;
