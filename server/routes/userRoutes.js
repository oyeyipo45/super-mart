import express from "express";
import User from "../models/userModel";
import getToken from "../util";
import bcrypt from "bcryptjs";
import {auth} from "../middleware/auth";

const router = express.Router();

router.get("/", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.json("error from res", error));
});

router.get("/user", async (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.json("error from res", error));
});

// @route POST api/users
// @desc REGISTER NEW USER
// @access PUBLIC

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  //SIMPLE VALIDATION
  if (!email || !password) {
    return res.status(400).json({ message: "Please Fill All Fields" });
  }

  //CHECK FOR EXISTING USER
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ message: "user Does not exists" });
    }

    //VALIDATE PASSWORD
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid Credentials" });

      res.json({
        token: getToken(user),
        user: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: getToken(user),
        },
      });
    });
  });
});

// @route POST api/users/auth
// @desc GET USER DATA
// @access PRIVATE
router.get("/signin/auth", auth, async (req, res) => {
  try {
    User.findById(req.user._id)
      .select("-password")
      .then((user) => res.json(user));
  } catch (error) {
    (error) => error.message;
  }
});

// @route POST api/users
// @desc REGISTER NEW USER
// @access PUBLIC

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //SIMPLE VALIDATION
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please Fill All Fields" });
  }

  //CHECK FOR EXISTING USER
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });

      //CREATE SALE $ HASH
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
          .then((user) => {
           
            res.json({
              token: getToken(user),
              user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: getToken(user)
              }
            });
          });
        });
      });
    }
  });
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
