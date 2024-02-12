const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { ensureAuthenticated, ensureRole } = require("../services/authenticatedRoutes");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
  
const upload = multer({ storage });

// Ajout d'une image

router.post("/upload", upload.single("file"), ensureAuthenticated, ensureRole(1), (req, res) => {
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

router.put("/updateImage", upload.single("file"), ensureAuthenticated, ensureRole(1), (req, res) => {
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

router.delete("/deleteImage", ensureAuthenticated, ensureRole(1), (req, res) => {
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

module.exports = router;