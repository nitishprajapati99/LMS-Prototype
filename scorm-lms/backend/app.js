const express = require("express");
const cors = require("cors");

const scormRoutes = require("./src/routes/scorm.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/scorm", scormRoutes);

module.exports = app;