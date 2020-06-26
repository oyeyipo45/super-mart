import express from "express";
import User from '../models/userModel';


const router = express.Router();



router.get('/createadmin', async (req, res, next) => {
    try {
        const user = new User({
            name:"damilola",
            email:"damilola45@gmail.com",
            password: '1234',
            isAdmin: true

        });
    
    
        const newUser = await user.save();
     console.log(newUser)
        res.send(newUser);
    } catch (error) {
        return next(error.message)
    }
})


export default router;