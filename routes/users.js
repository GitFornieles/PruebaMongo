const express = require("express");
const router = express.Router();
const User = require("../db/models/User");
const Cart = require("../db/models/Cart");
const userController = require("../controllers/user/index");

//Lista de todos los usuarios
router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//Creación de usuario nuevo
router.post("/new", async (req, res) => {
  const newUser = await userController.createUser(req.body);
  if (newUser.id) res.send(newUser);
  else res.status(500).send(newUser);
});

//Login
router.put("/login", async (req, res) => {
  const loggedUser = await userController.loginUser(req);
  switch (loggedUser) {
    case 00:
      res.status(404).send("Email Not Found");
      break;
    case 01:
      res.status(403).send("Invalid email or Password");
      break;
    default:
      {
        if (loggedUser.id) res.status(200).send(loggedUser);
        else res.status(500).send(loggedUser);
      }
      break;
  }
});

//Actualización de datos de usuario
router.patch("/update", async (req, res) => {
  const updatedUser = await userController.updateUser(req);
  if (updatedUser.id) res.status(202).send(updatedUser);
  else res.status(500).send(updatedUser);
});

// req.body={
//     "_id":"",
//     "articles":[ids de articulos]
//     "article1":"",
//     "article2":"",
// }
router.patch("/addFavs", async (req, res) => {
  let user = await userController.addFavs(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

router.patch("/remFavs", async (req, res) => {
  let user = await userController.remFavs(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

router.patch("/addFollow", async (req, res) => {
  let user = await userController.addFollow(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

router.patch("/remFollow", async (req, res) => {
  let user = await userController.remFollow(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

router.patch("/addSelling", async (req, res) => {
  let user = await userController.addSell(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

router.patch("/remSelling", async (req, res) => {
  let user = await userController.remSell(req.body);
  if (user._id) res.status(200).send(user);
  else res.status(500).send(user);
});

module.exports = router;
