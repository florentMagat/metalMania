require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

const bcrypt = require("bcrypt");
const morgan = require("morgan");
const multer = require('multer');

const storage = multer.diskStorage ({
  destination: function(req, file, cb) {
  return cb(null, "./images")
  },
  filename: function (req, file, cb) {
  return cb(null, file.originalname)
  }
})

const upload = multer ({ storage })

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use(express.urlencoded({extended: false}));

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

app.post('/upload', upload.single('file'), (req,res) => {
  req.body
  req.file
});

app.post("/register", async (req, res) => {
  console.log("req.body", req.body);

  try {
    // const hashedPassword = await bcrypt.hash(req.body.password)

    const results = await db.query(
      "INSERT INTO users (lastname, firstname, email, password, role_id) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.lastname,
        req.body.firstname,
        req.body.email,
        req.body.password,
        req.body.role_id
      ]
    );
    console.log("results", results);
    res.status(201).json({
      statuts: "succes",
      data: {
        user: results.rows[0],
      },
    })
    res.redirect("/")
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req,res)=>{

  try{

    const user = await db.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [
      req.body.email,
      req.body.password
    ] 
    ); 
    if(user){
      res.status(200).json({
        status: "success",
        data: {
          user: user.rows[0],
        },
      });
    }
} catch (err) {
    console.log(err);
} 
});

app.post("/logout", async (req,res)=>{

  try{
    res.status(200).json({
      msg: "logout",
      code: 200
  })
} catch (err) {
  console.log(err);
}
});

// app.all('*', async(req,res) =>{
//   try {

//   } catch (e) {
//     throw new Error (e)
//   }
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});