const mongoose = require("mongoose");
const bc = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    cellphone: { type: String, required: true },
    followedArticles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    ],
    favoriteProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
    ],
    password: { type: String, required: true },
    salt: { type: String },
    addressCity: { type: String, required: true },
    addressStreet: { type: String, required: true },
    addressApt: { type: String, required: true },
    addressNumber: { type: String, required: true },
    addressPostalCode: { type: String, required: true },
    addressCountry: { type: String, required: true },
    currentCart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    purchasedCarts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    selling: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
  },
  //METHODS
  {
    methods: {
      createHash: function (string, salt) {
        return bc.hash(string, salt);
      },
      validatePassword: function (password) {
        return bc
          .hash(password, this.salt)
          .then((hash) => hash === this.password);
      },
      newCart: function (number) {
        this.currentCart = number;
      },
    },
    //statics:{}
  }
);

//HOOKS

UserSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = bc.genSaltSync();
    return this.createHash(this.password, this.salt)
      .then((result) => {
        this.password = result;
        next();
      })
      .catch((err) => {
        console.log(err);
        next();
      });
  } else next()
});

module.exports = mongoose.model("User", UserSchema);
