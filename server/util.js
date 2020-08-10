import jwt from "jsonwebtoken";
import config from "./config";


const getToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
        
    }, config.SECRET, {
        expiresIn: 60 * 60
    })
}


export default getToken;