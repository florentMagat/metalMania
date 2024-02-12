require("dotenv").config();
const port = process.env.PORT || 3001;
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

// Limite le nombre de requêtes par IP (100 requêtes toutes les 15 minutes)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

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
      imgSrc: ["'self'", "http://localhost:3001/images", "http://localhost:3001", 'data:'],
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