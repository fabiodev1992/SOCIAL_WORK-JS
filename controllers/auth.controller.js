//inscription du user
//on importe la table modelUser
const UserModel = require('../models/user.model');
//importer jasonwebtoken
const jwt = require('jsonwebtoken');
//importation de errors.utils.js
const { signUpErrors, signInErrors} = require('../utils/errors.utils');



//une fonction pour utiliser le token de JWT
//process.env utilisé dans config/env
//en relation avec module.exports.signIn
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};



//controller pour enrégistrer un user(creation d'un compte)
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try {
      const user = await UserModel.create({pseudo, email, password });
      res.status(201).json({ user: user._id});
    }
    //gestion des erreurs de conexion
    catch(err) {
      //cette partie fais call à signUpErrors de error.utils.js
      //verification de pseudo psw et email.
      const errors = signUpErrors(err);
      res.status(200).send({ errors })
    }

}
//fonction de connexion de user
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({user: user._id});
  }catch (err){
    //verification si email et psw sont correcte
    //avant la conexion
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
}
//fonction  de deconexion(on retire le token)
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}
