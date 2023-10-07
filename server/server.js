require("dotenv").config();
const express = require("express");
const db = require("./db");

const morgan = require("morgan");
const app = express();

app.use(express.json());

app.get("/api/albums", async (req, res) => {
  const results = await db.query("select * from albums;");
  console.log(results);

  res.status(200).json({
    status: "success",
    data: {
      album: "metallica",
    },
  });
});

app.get("/api/albums/:id", (req, res) => {
  console.log(req.params);
  res.status(200).json({
    statuts: "succes",
    data: {
      album: "black album",
    },
  });
});

app.post("/api/albums", (req, res) => {
  console.log(req);
  res.status(201).json({
    statuts: "succes",
    data: {
      album: "black album",
    },
  });
});

app.put("/api/albums/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    statuts: "succes",
    data: {
      album: "black album",
    },
  });
});

app.delete("/api/albums/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
