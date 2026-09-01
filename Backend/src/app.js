require("dotenv").config();

const express = require("express");

const connectDB = require("./DB/config");

const userModule = require("./Modules/Users/index");
const courseModule = require('./Modules/Courses/index');

const app = express();

app.use(express.json());
//user route
app.use("/api/users", userModule);
//course route
app.use("/api/course", courseModule);

const startServer = async () => {

    await connectDB();

    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
    });

};

startServer();