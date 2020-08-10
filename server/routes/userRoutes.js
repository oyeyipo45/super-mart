import express from "express";
import User from '../models/userModel';
import getToken from "../util";


const router = express.Router();
router.get('/', async(req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch(error => res.json("error from res", error))
})


router.get('/user', async(req, res) => {
   User.find()
   .then((users) => res.json(users))
   .catch(error => res.json("error from res", error))
})


router.post('/user', (req, res) => {
   res.send("register")
})


router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(signinUser) {
            res.send({
                _id: signinUser._id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(user)
            })
    } else {
        res.status(401).send({msg: 'Invalid Email or Password'});
    }
})
 






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