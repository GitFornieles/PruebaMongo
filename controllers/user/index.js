const User = require("../../db/models/User");
const Cart = require("../../db/models/Cart");

const createUser = async (req) => {
  try {
    let newUser = await User.create(req);
    return newUser;
  } catch (error) {
    return error;
  }
};

const loginUser = async (req) => {
  try {
    const { email, password } = req.body;
    let loggedUser = await User.find({ email: email });
    loggedUser = loggedUser[0];
    if (!loggedUser) return 00;
    else {
      const validPass = await loggedUser.validatePassword(password);
      if (validPass) {
        const currentCart = Cart.find({
          owner: loggedUser._id,
          purchased: false,
        });
        if (!currentCart[0]) {
          const newCart = await Cart.create({
            owner: loggedUser._id,
            content: [null, null],
          });
          loggedUser.newCart(newCart._id);
          loggedUser={
            _id:loggedUser._id,
            name: loggedUser.name,
            lastname: loggedUser.lastname,
            email: loggedUser.email,
            cellphone: loggedUser.cellphone,
            followedArticles: loggedUser.followedArticles,
            favoriteProducts:loggedUser.favoriteProducts,
            //password:loggedUser.password,
            //salt:loggedUser.salt,
            addressCity:loggedUser.addressCity,
            addressStreet:loggedUser.addressStreet,
            addressApt:loggedUser.addressApt,
            addressNumber:loggedUser.addressNumber,
            addressPostalCode:loggedUser.addressPostalCode,
            addressCountry:loggedUser.addressCountry,
            currentCart:loggedUser.currentCart,
            purchasedCarts:loggedUser.purchasedCarts,
            selling:loggedUser.selling,
            //isAdmin:loggedUser.isAdmin,
          }
          return loggedUser;
        } else {
          loggedUser.newCart(currentCart[0]._id);
          loggedUser={
            _id:loggedUser._id,
            name: loggedUser.name,
            lastname: loggedUser.lastname,
            email: loggedUser.email,
            cellphone: loggedUser.cellphone,
            followedArticles: loggedUser.followedArticles,
            favoriteProducts:loggedUser.favoriteProducts,
            //password:loggedUser.password,
            //salt:loggedUser.salt,
            addressCity:loggedUser.addressCity,
            addressStreet:loggedUser.addressStreet,
            addressApt:loggedUser.addressApt,
            addressNumber:loggedUser.addressNumber,
            addressPostalCode:loggedUser.addressPostalCode,
            addressCountry:loggedUser.addressCountry,
            currentCart:loggedUser.currentCart,
            purchasedCarts:loggedUser.purchasedCarts,
            selling:loggedUser.selling,
            //isAdmin:loggedUser.isAdmin,
          }
          return loggedUser;
        }
      } else {
        return 01
      }
    }
  } catch (error) {
    return error;
  }
};

const updateUser=async (req) =>{
    try {
        const updatedUser=await User.findOneAndUpdate({ _id: req.body._id }, req.body,{new:true})
        return updatedUser
    } catch (error) {
        return error
    }
}

const addFavs=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.addFav(req.articles)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}

const remFavs=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.remFav(req.article)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}


const addFollow=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.addFollowed(req.articles)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}

const remFollow=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.remFollowed(req.article)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}

const addSell=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.addSelling(req.articles)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}

const remSell=async (req)=>{
    try {
        let user=await User.find({_id:req._id})
        user=user[0]
        user.remSelling(req.article)
        await user.save()
        return user
    } catch (error) {
        return error
    }
}

module.exports={createUser,loginUser,updateUser,addFavs,remFavs,addFollow,remFollow,addSell,remSell}