require("dotenv").config();
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const db = require("./db");
const app = express();

const bcrypt = require("bcrypt");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

app.use(session({
  secret: "SECRET_KEY",
  resave: false,
  saveUninitialized: false,
}));

//  schémas JOI
const { registerSchema } = require("./schemas");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Limite le nombre de requêtes par IP (100 requêtes toutes les 15 minutes)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(morgan("dev"));
app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: false }));

// Vérification de l'authentification et du role_id pour l'accès à certaines routes

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log("token ensureAuthenticated", token);

  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

function ensureRole(role_id) {
  return function(req, res, next) {
    if (!req.user || req.user.userId !== role_id) {
      return res.sendStatus(403);
    }
    next();
  }
}

// Consultation de la liste des albums

app.get("/api/albums", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
    const results = await db.query("select * from albums;");
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        album: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Consultation d'un album

app.get("/api/albums/:id", ensureAuthenticated, ensureRole(1, 2), async (req, res) => {
  try {
    const results = await db.query("select * from albums where id = $1", [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        album: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//REVIEWS

app.get("/api/reviews/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from reviews where album_id = $1",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/reviews/:id", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO REVIEWS (rating) values ($1) returning *",
      [req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Ajout d'un album

app.post("/api/albums/add", ensureAuthenticated, ensureRole(1), async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO albums (title, band, year, genre, picture, description) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        req.body.title,
        req.body.band,
        req.body.year,
        req.body.genre,
        req.body.picture,
        req.body.description,
      ]
    );
    console.log(results);
    res.status(201).json({
      statuts: "succes",
      data: {
        album: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Modification d'un album

app.put("/api/albums/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE albums SET title = $1, band = $2,  year = $3, genre = $4, picture = $5, description = $6 where id = $7 returning *",
      [
        req.body.title,
        req.body.band,
        req.body.year,
        req.body.genre,
        req.body.picture,
        req.body.description,
        req.params.id,
      ]
    );
    console.log(results);
    res.status(200).json({
      statuts: "succes",
      data: {
        album: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Suppression d'un album

app.delete("/api/albums/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
    const results = await db.query("DELETE FROM albums where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Ajout d'une image

app.post("/upload", upload.single("file"), ensureAuthenticated, ensureRole(1), (req, res) => {
  try {
    req.body;
    req.file;
    res.status(200).json({
      status: "success",
      data: {
        file: req.file,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Modification d'une image

app.put("/updateImage", upload.single("file"), ensureAuthenticated, ensureRole(1), (req, res) => {
  try {
    req.body;
    req.file;
    res.status(200).json({
      status: "success",
      data: {
        file: req.file,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Suppression d'une image

app.delete("/deleteImage", ensureAuthenticated, ensureRole(1), (req, res) => {
  const picture = req.body.picture;
  // Chemin du fichier à supprimer
  const filePath = path.join(__dirname, "/images/", picture);
  // Vérifie si le fichier existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res
        .status(200)
        .json({ status: "success", message: "Cette image n'existe pas" });
    } else {
      // Si le fichier existe, le supprime
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({
              status: "error",
              message: "Cette image ne peut pas être supprimée",
            });
        } else {
          res
            .status(200)
            .json({ status: "success", message: "Image supprimée" });
        }
      });
    }
  });
});

// Enregistrement d'un utilisateur

app.post("/register", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // hashage du mot de passe avant de l'enregistrer dans la BDD
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const results = await db.query(
      "INSERT INTO users (lastname, firstname, email, password, role_id) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.lastname,
        req.body.firstname,
        req.body.email,
        hashedPassword,
        req.body.role_id,
      ]
    );
    res.status(201).json({
      statuts: "success",
      data: {
        user: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Consultation de la liste des utilisateurs

app.get("/users", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    console.log("data", users);
    res.status(200).json({
      status: "success",
      data: {
        users: users.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Suppression d'un utilisateur

app.delete("/users/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
    await db.query("DELETE FROM users where id = $1", [req.params.id]);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Vérification de l'authentification

app.post("/login", async (req, res) => {
  try {
    const user = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.email]
    );

    if (user.rows.length > 0) {
      const match = await bcrypt.compare(req.body.password, user.rows[0].password);
      if (match) {
        const userId = user.rows[0].role_id;
        const token = jwt.sign({ userId }, "SECRET_KEY");
        req.session.jwt = token;
        console.log("req.session.jwt", req.session.jwt);
        res.status(200).json({
          token,
          status: "success",
          data: {
            user: user.rows[0],
            role: user.rows[0].role_id,
          }
        })} else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Déconnexion

app.post("/logout", async (req, res) => {
  try {
    res.status(200).json({
      msg: "logout",
      code: 200,
    });
  } catch (err) {
    console.log(err);
  }
});

// Gestion des erreurs 404

app.use((req, res, next) => {
  res.status(404).send("Navré, cette page n'existe pas.");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});