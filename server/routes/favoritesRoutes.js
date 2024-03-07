const express = require('express');
const router = express.Router();
const db = require("../db");

// Ajout d'un album dans les favoris

router.post("/favorites", async (req, res) => {
    try {
      const results = await db.query(
        "INSERT INTO favorites (user_id, album_id) values ($1, $2)",
        [
            req.body.user_id,
            req.body.album_id
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

// Suppression d'un album des favoris

router.delete("/favorites", async (req, res) => {
    try {
      const results = await db.query(
        "DELETE FROM favorites where user_id = $1 AND album_id = $2",
        [
            req.body.user_id,
            req.body.album_id
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

// Consultation de la liste des albums favoris

router.get("/favorites/:userId", async (req, res) => {
    try {
      const results = await db.query(
        "SELECT * FROM favorites WHERE user_id = $1",
        [req.params.userId]
      );
      res.status(200).json({
        status: "success",
        data: {
          favorites: results.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;