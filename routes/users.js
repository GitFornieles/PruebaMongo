const express = require("express");
const router = express.Router();
const User = require("../db/models/User");
const Cart = require("../db/models/Cart");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/new", async (req, res) => {
  const newUser = await User.create(req.body);
  res.send(newUser);
});

router.put("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  let loggedUser = await User.find({ email: email });
  loggedUser = loggedUser[0];
  console.log(loggedUser);
  //res.json(loggedUser)
  if (!loggedUser) res.send("No user");
  else {
    const validPass = await loggedUser.validatePassword(password);
    if (validPass) {
      const currentCart = Cart.find({
        owner: loggedUser._id,
        purchased: false,
      });
      if (!currentCart[0]) {
        const newCart =await Cart.create({ owner: loggedUser._id, content: [null, null] })
        loggedUser.newCart(newCart._id);
        loggedUser.save()
        res.status(200).send(loggedUser);
      } else {
        loggedUser.newCart(currentCart[0]._id);
        res.send(loggedUser);
      }
    } else {
      res.sendStatus(401);
    }
  }
});

router.patch("/update",async (req,res)=>{
    const updatedUser=await User.updateOne({_id:req.body._id},req.body)
    res.send(updatedUser)
})

module.exports = router;
