//on appel la base de donnée
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
//const { isValid } = require('validator');
//const { isValidObjectId } = require("mongoose");
//const isValid = require('validator');


//lister tous les user de la base
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password, -email");//select("-password")
    //permet de ne pas afficher le mot de passe sur le front ou autre donné en passant les paramètres
    //à la méthode
    res.status(200).json(users);
};

//lister un seul user
module.exports.userInfo = (req, res) => {
    //console.log(req.params);
    //on vérifie voir si le ID est reconnu ds la base
    //if (!ObjectID.isValid(req.params.id))
    //return res.status(400).send("ID non reconnu : " + req.params.id);
 //au cas où l'ID est retrouvé on affiches les infos
    UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    //else console.log("ID  pas retrouvé: " + err);
    else console.log("ID  pas retrouvé: ");
    }).select("-password");
};
//modification d'un user
module.exports.updateUser = async (req, res) => {
    //if (!ObjectID.isValid(req.params.id))
      //return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          //if (err) return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  //supprimer un user
  module.exports.deleteUser = async (req, res) => {
    //if (!ObjectID.isValid(req.params.id))
      //return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };

  //fonction pour suivre un user
  module.exports.follow = async (req, res) => {
    //if (
      //!ObjectID.isValid(req.params.id) ||
      //!ObjectID.isValid(req.body.idToFollow)
    //)
      //return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      // add to the follower list
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // add to following list
      await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  //ne plus follow une perssonne
  
  module.exports.unfollow = async (req, res) => {
    ///if (
     // !ObjectID.isValid(req.params.id) ||
      //!ObjectID.isValid(req.body.idToUnfollow)
    //)
      //return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
          if (!err) res.status(201).json(docs);
          else return res.status(400).jsos(err);
        }
      );
      // remove to following list
      await UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
          // if (!err) res.status(201).json(docs);
          if (err) return res.status(400).jsos(err);
        }
      );
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  