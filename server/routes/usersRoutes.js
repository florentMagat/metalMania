const express = require('express');
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../schemas");
const { ensureAuthenticated, ensureRole } = require("../services/authenticatedRoutes");

// Enregistrement du profil d'un utilisateur

router.post("/register", async (req, res) => {
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

// Consultation du profil d'un utilisateur
  
router.get("/users/:id", ensureAuthenticated, ensureRole(2), async (req, res) => {
  try {
      const users = await db.query("SELECT * FROM users WHERE id=$1", [
        req.params.id,
        ]);
        res.status(200).json({
        status: "success",
        data: {
            user: users.rows[0],
        },
        });
    } catch (err) {
        console.log(err);
    }
});
  
// Consultation de la liste des utilisateurs
  
router.get("/users", ensureAuthenticated, ensureRole(1), async (req, res) => {
    try {
        const users = await db.query("SELECT * FROM users");
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

// Modification du profil d'un utilisateur

router.put("/update/:id", ensureAuthenticated, ensureRole(1,2), async (req, res) => {
  try {
    // const { error, value } = registerSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).send(error.details[0].message);
    // }

    const results = await db.query(
      "UPDATE users SET lastname = $1, firstname = $2, email = $3 WHERE id = $4 RETURNING *",
      [
        req.body.lastname,
        req.body.firstname,
        req.body.email,
        req.params.id,
      ]
    );
    res.status(200).json({
    statuts: "succes",
    data: {
        user: results.rows[0],
    },
    });
  } catch (err) {
      console.log(err);
  }
});

router.put("/albums/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
  try {
      const results = await db.query(
      "UPDATE albums SET title = $1, band = $2,  year = $3, genre = $4, picture = $5, description = $6, video = $7 where id = $8 returning *",
      [
          req.body.title,
          req.body.band,
          req.body.year,
          req.body.genre,
          req.body.picture,
          req.body.description,
          req.body.video,
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
  
// Suppression d'un utilisateur

router.delete("/users/:id", ensureAuthenticated, ensureRole(1,2), async (req, res) => {
    try {
        await db.query("DELETE FROM users where id = $1", [req.params.id]);
        res.status(200).json({
        status: "success",
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;