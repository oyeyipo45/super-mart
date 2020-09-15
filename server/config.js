import dotenv from "dotenv";
dotenv.config();

export default {
    MONGODB : process.env.MONGODB_URL ,
    SECRET : process.env.SECRET,
    PAYPAL_CLIENT_ID : process.env.PAYPAL_CLIENT_ID
}


