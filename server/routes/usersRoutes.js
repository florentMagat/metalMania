const express = require('express');
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../schemas");
const { ensureAuthenticated, ensureRole } = require("../services/authenticatedRoutes");

// Enregistrement d'un utilisateur

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
  
// Suppression d'un utilisateur

router.delete("/users/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
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