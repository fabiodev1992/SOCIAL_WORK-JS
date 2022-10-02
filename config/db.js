//connexion à la base de donnée
const mongoose = require("mongoose");

mongoose
    .connect(
       // "mongodb+srv://fabiodev:F40bio1992@cluster0.cwudu0f.mongodb.net/test",
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.cwudu0f.mongodb.net/db_social",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useCreateIndex: true,
            //useFindAndModify: false,
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
