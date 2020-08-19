import dotenv from "dotenv";
dotenv.config();

export default {
    MONGODB : process.env.MONGODB_URL ,
    SECRET : process.env.SECRET
}

// || 'mongodb://localhost/e_commerce'