require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/albums", async (req, res) => {
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

app.get("/api/albums/:id", async (req, res) => {
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

app.post("/api/albums/add", async (req, res) => {
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

app.put("/api/albums/:id", async (req, res) => {
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

app.delete("/api/albums/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);  
    res.status(204).json({
    status: "success",
  });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
