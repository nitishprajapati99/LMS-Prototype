const express = require("express");
const multer = require("multer");

const { uploadScorm } = require("../controllers/scorm.controller");

const router = express.Router();

const upload = multer({ dest: "storage/scorm/" });

router.post( "/upload", upload.single("scorm"), uploadScorm );

module.exports = router;