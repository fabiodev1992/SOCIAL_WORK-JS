//inscription du user
//on importe la table modelUser
const UserModel = require('../models/user.model');
//importer jasonwebtoken
const jwt = require('jsonwebtoken');



//controller pour enrégistrer un user(creation d'un compte)
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
      const user = await UserModel.create({pseudo, email, password });
      res.status(201).json({ user: user._id});
    }
    catch(err) {
      //const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }

}