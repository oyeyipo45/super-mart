import express from "express";
import User from "../models/userModel";
import getToken from "../util";

const router = express.Router();
router.get("/", async (req, res) => {

  console.log(req.body);
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.json("error from res", error));
});

router.get("/user", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.json("error from res", error));
});

// router.post("/user", (req, res) => {
//   res.send("register");
// });

router.post("/signin", async (req, res) => { 
  
  try {
    
    const signinUser = await User.findOne
    ({
      email: req.body.email,
      password: req.body.password,
    });
    if(!signinUser){
      return res.status(403).json({
        message: 'Wrong email or password.'
      });
    } else if (signinUser) {
      res.send({
        _id: signinUser._id,
        firstName: signinUser.firstName,
        lastName: signinUser.lastName,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ message: "Invalid Email or Password" });
    }
    
  } catch (error) {
    return (error.message);
  }
});


router.post("/signup", async (req, res) => { 
  
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    if(newUser){
      res.send({
        _id:newUser._id,
        firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
      })
    }
    console.log(newUser);
    
  } catch (error) {
    return (error.message);
  }
});


router.get("/createadmin", async (req, res, next) => {
  try {
    const user = new User({
      firstName: "damilola",
      lastName: "oyeyipo",
      email: "damilola45@gmail.com",
      password: "1234",
      isAdmin: true,
    });

    const newUser = await user.save();
    console.log(newUser);
    res.send(newUser);
  } catch (error) {
    return next(error.message);
  }
});

export default router;
