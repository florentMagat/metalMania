require("dotenv").config();
const port = process.env.PORT || 3002;
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// importation des routes

const usersRoutes = require('./routes/usersRoutes');
const albumsRoutes = require('./routes/albumsRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const authentificationsRoutes = require('./routes/authentificationsRoutes');

// Limite le nombre de requêtes par IP (50 requêtes/seconde)

const limiter = rateLimit({
  windowMs: 1000,
  max: 50,
});

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
  secret: "SECRET_KEY",
  resave: false,
  saveUninitialized: false,
}));

app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
);
app.use(express.json());
app.use(limiter);
app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: false }));
app.use([usersRoutes, albumsRoutes, imagesRoutes, reviewsRoutes, authentificationsRoutes]);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Navré, cette page n'existe pas.");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});