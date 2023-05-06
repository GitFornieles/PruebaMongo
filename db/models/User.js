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
    isAdmin: { type: Boolean, default: false },
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
      addFav: function (number) { //OJO que está para recibir array de ids
        let position;
        if (this.favoriteProducts[0] === null) {
          number.map((element, i) => (this.favoriteProducts[i] = element));
        } else {
          position = this.favoriteProducts.length;
          number.map(
            (element, i) => (this.favoriteProducts[i + position] = element)
          );
        }
      },
      remFav: function (number) { //OJO que está para recibir array de ids
        let temp;
        if (this.favoriteProducts.length === 1) this.favoriteProducts[0] = null;
        else
          temp = this.favoriteProducts.filter((element) => element != number);
        this.favoriteProducts = temp;
      },
      addFollowed: function (number) { //OJO que está para recibir array de ids
        let position;
        if (this.followedArticles[0] === null) {
          number.map((element, i) => (this.followedArticles[i] = element));
        } else {
          position = this.followedArticles.length;
          number.map(
            (element, i) => (this.followedArticles[i + position] = element)
          );
        }
      },
      remFollowed: function (number) { //OJO que está para recibir array de ids
        let temp;
        if (this.followedArticles.length === 1) this.followedArticles[0] = null;
        else
          temp = this.followedArticles.filter((element) => element != number);
        this.followedArticles = temp;
      },
      addSelling: function (number) { // Recibe un único Article_id
        let position;
        if (this.selling[0] === null) {
          this.selling[0]=number;
        } else {
          this.selling.push(number)
        }
      },
      remSelling: function (number) { // Recibe un único Article_id
        let temp;
        if (this.selling.length === 1) this.selling[0] = null;
        else temp = this.selling.filter((element) => element != number);
        this.selling = temp;
      },
      setAdmin:function (){
        this.isAdmin=true
      },
      remAdmin:function () {
        this.isAdmin=false
      },
      newPurchasedCart:function(){
        this.purchasedCarts.push(this.currentCart)
        this.currentCart=null
      }
      //newPurchasedCart
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
  } else next();
});

module.exports = mongoose.model("User", UserSchema);
