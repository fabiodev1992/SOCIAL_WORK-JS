//la variable express  du frimwork express
const express = require('express');
//export de body-parser
const bodyParser = require('body-parser');
//on appel la route user
const userRoutes = require('./routes/user.routes');


//pour fair appel au valiables PORT d'envoronement qui dépendent de dotenv
//dotenv est une dependanc
//****Demarage du serveur *****/
require('dotenv').config({path: './config/.env'})
require('./config/db');
const app = express();

//gestion des midleswers
//bodyparserfait la gestion des requette
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




//routes api url pour ajouter un user conduit vers -controller pour enrégistrer un user
app.use('/api/user', userRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Application run on port ${process.env.PORT}`);
})