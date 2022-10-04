//creation d'un objet routeur qui pointe vers express
const router = require("express").Router();
//on exporte le controler de authContriller
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller.js");


// authentification
//la route Ajou d'un utilisateur creation(inscription,connexion,déconnexion)
router.post("/register", authController.signUp);
//la route  pour avoir tous les users de la base.elle pointe sur user controller
//et appel la fonction getAllusers
///************ */
//route pour ce loger
 router.post("/login", authController.signIn);
//****************** */
//route pour ce déconnecters
router.get("/logout", authController.logout);
//****************** */
//la route  pour avoir tous les users de la base.elle pointe sur user controller
//et appel la fonction getAllusers
router.get("/", userController.getAllUsers);
//la route pour lister un user grace à son id elle pointe sur user controller et appel le 
//fonction userInfo
router.get("/:id", userController.userInfo);
//la route pour modifier un user
router.put("/:id", userController.updateUser);
//supprimer un user
router.delete("/:id", userController.deleteUser);
//mètrre à joure letableaux àl'intérieure du user
//follow pour suivre un user en ajoutant un elementdsle arrey
router.patch("/follow/:id", userController.follow);
//neplus suivrerun user
router.patch("/unfollow/:id", userController.unfollow);





//pour pèrmètre que la route soit visible dans tous le projet
module.exports = router;