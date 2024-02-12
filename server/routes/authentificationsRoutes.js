const express = require('express');
const router = express.Router();
const db = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


// Vérification de l'authentification

router.post("/login", async (req, res) => {
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

router.post("/logout", async (req, res) => {
    try {
        res.status(200).json({
        msg: "logout",
        code: 200,
        });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;