//la variable express  du frimwork express
const express = require('express');
//export de body-parser
const bodyParser = require('body-parser');
//export de cooki-parser
const cookieParser = require('cookie-parser');
//on appel la route user
const userRoutes = require('./routes/user.routes');
//pour fair appel au valiables PORT d'envoronement qui dépendent de dotenv
//dotenv est une dependanc
//****Demarage du serveur *****/
require('dotenv').config({path: './config/.env'});
require('./config/db');
//Ajout du middlwar de l'authantification
const {checkUser, requireAuth} = require('./middleware/auth.middlware');
const app = express();

//gestion des midleswers
//bodyparserfait la gestion des requette
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//utilisation du middlewar cookie-parser
app.use(cookieParser());

//utilisation du middleware pour assurer la 
//sécurité de la connexion
//jwt
app.get('*', checkUser);
//Verification de la requette d'authentification
// de auth.middlware
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});


//routes api url pour ajouter un user conduit vers -controller pour enrégistrer un user
app.use('/api/user', userRoutes);

//demarage du serveur( lécouteur)
app.listen(process.env.PORT, () => {
    console.log(`Application run on port ${process.env.PORT}`);
})