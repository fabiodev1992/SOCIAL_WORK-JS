const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    picture: {
     type: String,
      default: "./uploads/profil/random-user.png"
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: {
      type: [String]
    },
    following: {
      type: [String]
    },
    likes: {
     type: [String]
    }
   },
   //timestamp permet de déterminer le temps de creation du user
      {
     timestamps: true.valueOf,
      }  
)

// foncionpour crypter le mot de passe ou les données dans la base
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  //cette ligne crypte le psw dans la base
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//userSchema.statics.login = async function(email, password) {
  //const user = await this.findOne({ email });
  //if (user) {
    //const auth = await bcrypt.compare(password, user.password);
    ///if (auth) {
     // return user;
    //}
   // throw Error('incorrect password');
  //}
  //throw Error('incorrect email')
//};
//cette ligne crée la table danslabase et insert les donnéés dans cette table
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;