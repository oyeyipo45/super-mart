import dotenv from "dotenv";
dotenv.config();

export default {
    MONGODB : process.env.MONGODB_URL
}

// || 'mongodb://localhost/e_commerce'