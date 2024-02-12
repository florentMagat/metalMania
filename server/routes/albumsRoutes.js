const express = require('express');
const router = express.Router();
const db = require("../db");
const { ensureAuthenticated, ensureRole } = require("../services/authenticatedRoutes");

// Consultation de la liste des albums

router.get("/api/albums", ensureAuthenticated, ensureRole(1), async (req, res) => {
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

router.get("/api/albums/:id", ensureAuthenticated, ensureRole(1, 2), async (req, res) => {
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

// Ajout d'un album

router.post("/api/albums/add", ensureAuthenticated, ensureRole(1), async (req, res) => { 
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

router.put("/api/albums/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
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

router.delete("/api/albums/:id", ensureAuthenticated, ensureRole(1), async (req, res) => {
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

module.exports = router;