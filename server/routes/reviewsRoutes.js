const express = require('express');
const router = express.Router();
const db = require("../db");
const { ensureAuthenticated, ensureRole } = require("../services/authenticatedRoutes");

router.get("/api/reviews/:id", ensureAuthenticated, ensureRole(1, 2), async (req, res) => {
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
  
router.post("/api/reviews/:id", ensureAuthenticated, ensureRole(1, 2), async (req, res) => {
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

module.exports = router;